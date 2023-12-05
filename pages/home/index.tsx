import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import useLoading from '@/src/hooks/useLoading';
import { Viewer } from '@toast-ui/react-editor';
import { LoadingComponent } from '@/components/common/loading/LoadingComponent';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */

const Index = props => {
  const [isLoading, loadingFunction] = useLoading();

  return (
    <Container>
      <LoadingComponent mode={'car'} top={300} />
      <div> 여기는 홈 : {props.from} </div>
      <div> 급하니 기존 내용들을 그냥 옮기고 천천히 수정해 나가기 </div>
      <div> 할일들 디자인 잡기 </div>
      <div> 일정 디자인 잡기 </div>
      <div> 설정 디자인 잡기 </div>
      <div> 대시보드 디자인 잡기 </div>
      <div> 프로필 디자인 잡기 </div>
      <div> 블로그 정렬 하기 </div>
      <div> 블로그 글 옮기기 </div>
      <div> 블로그 목록 UI 형태 바꾸기 </div>
      <div> 상단 스크롤에 진행 바 추가하기 </div>
      <div> 1. 블로그 그냥 그대로 옮기기 </div>
      <div>
        2. 게시판 같은거 주위 컴포넌트 참고할 만한 내용들 코드 정리해놓기
      </div>
      <div> 3. 게시판, 블로그 최신순, 조회순 등등 로직 처리해놓기 </div>
      <div> 4. 배포 해버리기 </div>
      <div> 5. 깃허브 코드 작성해놓으면서 깃 정리해나가면서 개발하기 </div>
      <div>
        6. 현재 글 작성 후 뒤로가기 한번 더 걸리는 문제, 유튜브 플레이어 UI 개선
        필요
      </div>
      <div> 7. 전체적으로 rem 방식으로 변경과 시멘틱 태그 변경하기 </div>
      <div> 8. 프로그레스 바 생성하기 </div>
      <div> 9. 메모장 할일들 처리하기 </div>
      <div> 10. 컴포넌트들 수정하기 </div>
      <div> 11. 자기소개서 정리하기 </div>
      <div> 12. 설정 디자인 하기 </div>
      <div> 13. react-query 사용해보기 </div>
      <div> 14. redux 정리해보기 </div>
      <div> 15. 백엔드 response 및 응답코드 정리하기 </div>
      <div>
        16. 카테고리 메뉴의 썸네일 이미지 변경시 이미지 삭제 기능 구현되어있는지
        확인
      </div>
      <div>
        17. 블로그 글을 보고 블로그 홈으로 가면 html로 메뉴가 바뀌는 문제 해결
      </div>
      <div> 18. 블로그 글 자동저장 </div>
      <div> 19. 글 저장 실패시 후 처리 </div>
      <div> 20. 블로그 글 작성 도중 나갈경우 alert창 만들기 </div>
      <div> 21. 삭제 버튼 누를경우 confirm창 만들기 </div>
      <div>
        22. 카테고리 경로 수정 시 썸네일 이미지 경로 등 바뀌는지 확인해보기...
      </div>
      <div> 23. 탭을 닫기전에 블로그 창 안꺼지게 하기 </div>
      <div>
        {' '}
        24. 최근에 읽은 내용 캐시나 등등으로 저장해서 바로 이동가능하게 하기{' '}
      </div>
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
  position: relative;
`;
