"use client";

import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import { Modal } from "@component/common/modal/hybrid/Modal";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useModalState from "@hooks/useModalState";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import useTeamSpaceStore from "@store/teamSpaceStore";
import { useQuery } from "@tanstack/react-query";
import { mapTeamSpaceProcessStatusToGroup } from "@utils/variables/teamSpaceProcessStatus";
import gsap from "gsap";
import React, { Suspense, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls as ThreeOrbitControls } from "three-stdlib";
useGLTF.preload("/glb/castle-wall.glb");

interface User {
  id: number;
  nickname: string;
  profileImagePath: string;
}

interface Assignee {
  id: number;
  user: User;
  teamSpaceTeam: null | any;
  jobRoles: string[];
  position: string;
  nickname: string;
}

interface Task {
  id: number;
  title: string;
  description: string;
  assignee: Assignee;
  scheduledStartAt: string;
  scheduledEndAt: string;
  firstStartedAt: string | null;
  firstCompletedAt: string | null;
  refUrlJSON: any;
  imageURLJSON: any;
  processStatus: string;
  jobRole: string;
  action: string;
  createdAt: string;
  modifiedAt: string;
  deleteAt: string | null;
}

interface OperationNode {
  id: number;
  title: string;
  description: string;
  type: "operation" | string;
  tasks: Task[];
  x: number;
  y: number;
}

interface ServiceNode {
  id: number;
  title: string;
  description: string;
  type: "service" | string;
  operations: OperationNode[];
  x: number;
  y: number;
}

interface ProjectNode {
  id: number;
  title: string;
  description: string;
  type: "project" | string;
  services: ServiceNode[];
  x: number;
  y: number;
}

interface NodeProps {
  node: ProjectNode | ServiceNode | OperationNode | Project2D | Service2D | Node2D;
  type: "project" | "service" | "operation" | string;
}

interface Node2D {
  id: number;
  title: string;
  description: string;
  type: string;
  x?: number;
  y?: number;
}

interface Service2D extends Node2D {
  operations: Node2D[];
}

interface Project2D extends Node2D {
  services: Service2D[];
}

const fetchProject = async (projectId: number) => {
  const res = await fetch(`/api/team-space/project/${projectId}`);
  if (!res.ok) throw new Error("프로젝트를 불러오는 데 실패했습니다.");
  return res.json();
};

// Circular Layer 배치 함수
function arrangeCircularLayer(
  center: {x: number; y: number} | Project2D | Service2D,
  nodes: Node2D[],
  baseRadius: number,
  minDist: number = 20,
) {
  if (!nodes.length) return;
  let radius = baseRadius;
  let positioned = false;

  while (!positioned) {
    positioned = true;
    const positions: {x: number; y: number}[] = [];
    const angleStep = (2 * Math.PI) / nodes.length;
    for (let i = 0; i < nodes.length; i++) {
      // 🔥 변경: service/operation 배치 구분 단순화
      const angle =
        nodes[i].type == "operation" ? i * angleStep + Math.PI / 6 : i * angleStep;
      positions.push({
        x: center.x! + radius * Math.cos(angle),
        y: center.y! + radius * Math.sin(angle),
      });
    }

    // 🔥 변경: 최소 거리 충돌 체크 유지
    outer: for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < minDist) {
          radius += 20;
          positioned = false;
          break outer;
        }
      }
    }

    if (positioned)
      nodes.forEach((n, i) => {
        n.x = positions[i].x;
        n.y = positions[i].y;
      });
  }
}

const computeWorkflowLayout2D = (projectData: any): Project2D => {
  const project: Project2D = {
    id: projectData.id,
    title: projectData.title,
    description: projectData.description,
    type: "project",
    services: (projectData.teamSpaceServices || []).map((s: any) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      type: "service",
      operations: (s.teamSpaceOperations || []).map((o: any) => ({
        id: o.id,
        title: o.title,
        description: o.description,
        tasks: o.teamSpaceTasks || [],
        type: "operation",
      })),
    })),
    x: 0,
    y: 0,
  };

  arrangeCircularLayer(project, project.services, 200, 40);
  project.services.forEach((s) => {
    arrangeCircularLayer(s, s.operations, 80, 40);
  });

  return project;
};

type CastleProps = {
  position?: [number, number, number];
  scale?: [number, number, number];
  percent: number;
};

function Castle({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  percent = 0,
}: CastleProps) {
  const group = useRef<THREE.Group>(null!);
  const {scene: originalScene, animations} = useGLTF(
    "/glb/castle-wall.glb",
  ) as any;
  const mixer = useRef<THREE.AnimationMixer>();
  const clonedScene = useMemo(() => originalScene.clone(), [originalScene]);
  const castleIndex = Math.floor(percent / 10);
  // Group 단위 visible 제어
  useLayoutEffect(() => {
    clonedScene.traverse((obj: any) => {
      if (obj.name.startsWith("Castle")) {
        //     // 이름에서 숫자 추출
        const num = parseInt(obj.name.replace("Castle", ""), 10);
        if (!isNaN(num)) {
          obj.visible = num <= castleIndex;
        }
        //   } else {
        //     console.log("TeamSpaceWorkflowMain.tsx 파일 : ",obj);
      }
    });
  }, []);

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(clonedScene);

      animations.forEach((clip: any) => {
        const sub = THREE.AnimationUtils.subclip(clip, "clip20toEnd", 24, 40);
        const action = mixer.current!.clipAction(sub);
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.play();
      });
    }
  }, [animations, clonedScene]);

  useFrame((_, delta) => mixer.current?.update(delta));

  return (
    <primitive
      ref={group}
      object={clonedScene}
      position={position}
      scale={scale}
    />
  );
}
type OrbitControlsType = ThreeOrbitControls;
// 개별 노드 컴포넌트
const Node = ({node, type}: NodeProps) => {
  const {camera, controls} = useThree() as {
    camera: THREE.PerspectiveCamera;
    controls: OrbitControlsType;
  };
  const modalState = useModalState();

  const {percent, total, completed, delayedCount, assignees} = useMemo(() => {
    let tasks: any[] = [];
    if (type === "operation") tasks = (node as OperationNode).tasks || [];
    else if (type === "service")
      (node as ServiceNode).operations.forEach((op) =>
        tasks.push(...(op.tasks || [])),
      );
    else if (type === "project")
      (node as ProjectNode).services.forEach((s) =>
        s.operations.forEach((op) => tasks.push(...(op.tasks || []))),
      );

    const total = tasks.length;
    const completed = tasks.filter(
      (t) => mapTeamSpaceProcessStatusToGroup(t.processStatus) === "완료",
    ).length;

    const delayedCount = tasks.filter((t) => {
      if (!t.scheduledEndAt) return false;
      const scheduledEnd = new Date(t.scheduledEndAt);
      const now = new Date();
      const isCompleted =
        mapTeamSpaceProcessStatusToGroup(t.processStatus) === "완료";
      return scheduledEnd < now && !isCompleted;
    }).length;

    const assignees = Object.values(
      tasks.reduce(
        (acc, t) => {
          if (t.assignee) acc[t.assignee.id] = t.assignee;
          return acc;
        },
        {} as Record<number, (typeof tasks)[0]["assignee"]>,
      ),
    );

    return {
      total,
      completed,
      percent: total === 0 ? 0 : (completed / total) * 100,
      delayedCount,
      assignees,
    };
  }, [node, type]);

  const moveCameraPosition = () => {
    if (!controls) return;
    const targetX = node.x!;
    const targetY = node.y!;
    const z = camera.position.z;

    gsap.to(controls.target, {
      duration: 1,
      x: targetX,
      y: targetY,
      z: 0,
      onComplete: () => controls.update(),
    });

    gsap.to(camera.position, {
      duration: 1,
      x: targetX,
      y: targetY + 20,
      z: 120,
      onComplete: () => controls.update(),
    });
  };

  return (
    <>
      <Suspense fallback={null}>
        <Castle position={[node.x!, node.y!, 1]} percent={percent} />
      </Suspense>
      <Html position={[node.x!, node.y!, 0]} center zIndexRange={[10, 20]}>
        <button
          className="select-none text-center"
          onClick={moveCameraPosition}
        >
          <div className="text-lg font-bold">{node.title}</div>
          <div className="w-[8rem]">
            {completed || 0} / {total || 0} ({percent.toFixed(0)}%)
          </div>
          <button
            onClick={() => modalState.openModal()}
            className="text-white w-[4.5rem] rounded-md bg-blue-600 px-1 py-1"
          >
            상세조회
          </button>
        </button>
        <Modal modalState={modalState} className="w-full">
          <ModalTemplate
            className="flex w-[100vw] flex-col"
            isRemoveHeaderBar={true}
          >
            <div className="mb-2 flex justify-center p-1 text-2xl font-bold">
              {node.type}
            </div>
            <div className="flex w-full">
              <span className="font-semibold">제목: </span> {node.title}
            </div>
            <div className="flex w-full">
              <span className="font-semibold">설명: </span> {node.description}
            </div>
            <div className="flex w-full">
              <span className="font-semibold">진행률: </span> {completed || 0}/
              {total || 0} ({percent.toFixed(0)}%)
            </div>
            <div className="flex w-full">
              <span className="font-semibold">딜레이: </span> {delayedCount}
            </div>
            <div className="flex w-full">
              <span className="font-semibold">팀원 : </span>
              <div className="flex gap-x-2">
                {(assignees as Assignee[]).map((i) => (
                  <div key={i.id} className="px-1">
                    {i.nickname}
                  </div>
                ))}
              </div>
            </div>
          </ModalTemplate>
        </Modal>
      </Html>
    </>
  );
};

// Edge 묶기
const Edges = ({projectLayout}: {projectLayout: Project2D}) => {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    projectLayout.services.forEach((s) => {
      // 🔥 변경: z 좌표 -1 고정 (레이어 분리)
      points.push(new THREE.Vector3(projectLayout.x!, projectLayout.y!, -1));
      points.push(new THREE.Vector3(s.x!, s.y!, -1));
      s.operations.forEach((op) => {
        points.push(new THREE.Vector3(s.x!, s.y!, -1));
        points.push(new THREE.Vector3(op.x!, op.y!, -1));
      });
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [projectLayout]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={0x999999} />
    </lineSegments>
  );
};

interface ITeamSpaceWorkflowMain {
  projectList: ITeamSpaceProject[];
}

const TeamSpaceWorkflowMain = (props: ITeamSpaceWorkflowMain) => {
  const teamSpaceStore = useTeamSpaceStore();

  const {data: project} = useQuery<{data: any}>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => fetchProject(teamSpaceStore.activeProject.id),
    enabled: teamSpaceStore.activeProject.id > 0,
  });

  const projectLayout = useMemo(
    () => (project?.data ? computeWorkflowLayout2D(project.data) : null),
    [project?.data],
  );

  useEffect(() => {
    teamSpaceStore.setProjectList(props.projectList);
  }, []);

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="grid h-[3.75rem] grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">프로젝트 </div>
        <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
          {teamSpaceStore.projectList.map((i) => (
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              key={i.id}
              isActive={i.id === teamSpaceStore.activeProject.id}
              onClick={() => {
                teamSpaceStore.setActiveProject({id: i.id, title: i.title});
              }}
            >
              {i.title}
            </ThemeActiveButton1>
          ))}
        </div>
      </div>
      <div className="relative h-full min-h-[600px] w-full flex-1 p-1 pt-2 primary-border-radius">
        <Canvas orthographic camera={{position: [5, 5, 10], zoom: 1}}>
          {/* PerspectiveCamera에 position을 지정해주지 않으면 움직이지 않음 위에 코드에서 제약이 걸림 */}
          {/* @ts-ignore */}
          <PerspectiveCamera makeDefault fov={40} position={[0, 50, 500]} />
          <OrbitControls makeDefault enablePan enableZoom />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, 10]} intensity={0.5} />
          {projectLayout && (
            <>
              <Edges projectLayout={projectLayout} />
              <Node node={projectLayout} type="project" />

              {projectLayout.services.map((s) => (
                <React.Fragment key={s.id}>
                  <Node node={s} type="service" />

                  {s.operations.map((op) => (
                    <React.Fragment key={op.id}>
                      <Node node={op} type="operation" />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
          {/* <gridHelper args={[10, 10]} /> */}
          {/* <axesHelper args={[50]} /> */}
        </Canvas>
      </div>
    </div>
  );
};

export default TeamSpaceWorkflowMain;
