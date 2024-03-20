import Button from '@components/common/button/Button';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useEffect, useState } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SolveRender.tsx
 * @version 0.0.1 "2023-06-08 00:32:59"
 * @description 웹과 연동하여 로봇팔 작동시키는 코드
 */

const SolveRender = (props) => {
  let amount = 20;
  const [motorAngs, setMotorAngs] = useState({
    motor1: '160',
    motor2: '160',
    motor3: '160',
    motor4: '160',
    motor5: '160',
    motor6: '160',
  });
  const [tempMotorAngs, setTempMotorAngs] = useState({
    motor1: '160',
    motor2: '160',
    motor3: '160',
    motor4: '160',
    motor5: '160',
    motor6: '160',
  });

  function enterpressed() {
    props.Socket.send(document.getElementById('txbuff').value);
    document.getElementById('txbuff').value = '';
  }

  const btnOrderHandler = (order: any) => {
    switch (order) {
      case 'back':
        setMotorAngs({
          ...motorAngs,
          motor2:
            Number(motorAngs.motor2) < 180
              ? (Number(motorAngs.motor2) + amount).toString()
              : '180',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor2:
              Number(motorAngs.motor2) < 180
                ? (Number(motorAngs.motor2) + amount).toString()
                : '180',
          }),
        );
        break;
      case 'left':
        setMotorAngs({
          ...motorAngs,
          motor1:
            Number(motorAngs.motor1) < 180
              ? (Number(motorAngs.motor1) + amount).toString()
              : '180',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor1:
              Number(motorAngs.motor1) < 180
                ? (Number(motorAngs.motor1) + amount).toString()
                : '180',
          }),
        );
        break;
      case 'catch':
        setMotorAngs({
          ...motorAngs,
          motor6: Number(motorAngs.motor6) > 120 ? '80' : '160',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor6: Number(motorAngs.motor6) > 120 ? '80' : '160',
          }),
        );
        break;
      case 'right':
        setMotorAngs({
          ...motorAngs,
          motor1:
            Number(motorAngs.motor1) > 0
              ? (Number(motorAngs.motor1) - amount).toString()
              : '0',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor1:
              Number(motorAngs.motor1) > 0
                ? (Number(motorAngs.motor1) - amount).toString()
                : '0',
          }),
        );
        break;
      case 'front':
        setMotorAngs({
          ...motorAngs,
          motor2:
            Number(motorAngs.motor2) > 0
              ? (Number(motorAngs.motor2) - amount).toString()
              : '0',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor2:
              Number(motorAngs.motor2) > 0
                ? (Number(motorAngs.motor2) - amount).toString()
                : '0',
          }),
        );
        break;
      case 'up':
        setMotorAngs({
          ...motorAngs,
          motor3:
            Number(motorAngs.motor3) > 0
              ? (Number(motorAngs.motor3) - amount).toString()
              : '0',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor3:
              Number(motorAngs.motor3) > 0
                ? (Number(motorAngs.motor3) - amount).toString()
                : '0',
          }),
        );
        break;
      case 'down':
        setMotorAngs({
          ...motorAngs,
          motor3:
            Number(motorAngs.motor3) < 180
              ? (Number(motorAngs.motor3) + amount).toString()
              : '180',
        });
        props.Socket.send(
          JSON.stringify({
            ...motorAngs,
            motor3:
              Number(motorAngs.motor3) < 180
                ? (Number(motorAngs.motor3) + amount).toString()
                : '180',
          }),
        );
        break;
      case 'init':
        setMotorAngs({
          motor1: '160',
          motor2: '160',
          motor3: '160',
          motor4: '160',
          motor5: '160',
          motor6: '160',
        });
        setTempMotorAngs({
          motor1: '160',
          motor2: '160',
          motor3: '160',
          motor4: '160',
          motor5: '160',
          motor6: '160',
        });
        props.Socket.send(
          JSON.stringify({
            motor1: '160',
            motor2: '160',
            motor3: '160',
            motor4: '160',
            motor5: '160',
            motor6: '160',
          }),
        );
        break;
    }
  };

  const onChangeMotorAngs = () => {
    const temp = {};
    Object.keys(tempMotorAngs).map((i) => {
      if (!isNaN(tempMotorAngs[i])) {
        if (tempMotorAngs[i] <= 180 && tempMotorAngs[i] > 0) {
          temp[i] = tempMotorAngs[i];
        }
      }
    });
    if (Object.keys(temp).length === 0) return;
    setMotorAngs({ ...motorAngs, ...temp });
    setTempMotorAngs({
      motor1: '',
      motor2: '',
      motor3: '',
      motor4: '',
      motor5: '',
      motor6: '',
    });
  };

  const sendMotorAngs = () => {
    props.Socket.send(JSON.stringify(motorAngs));
  };

  useEffect((): any => {
    function start() {
      props.Socket.onmessage = function (evt) {
        document.getElementById('rxConsole').value += evt.data;
      };
    }
    window.onload = function (_) {
      start();
    };
  }, []);

  return (
    <Container>
      <CC.RowCenterDiv>
        <input
          className="txd"
          type="text"
          id="txbuff"
          onKeyDown={(e: any) => {
            if (e.keyCode == 13) enterpressed();
          }}
        />
        <input
          className="txd"
          type="button"
          onClick={enterpressed}
          value="Send"
        />
      </CC.RowCenterDiv>
      <CC.ColumnDiv>
        <CC.RowDiv gap={10}>
          <Button height={'6rem'} onClick={() => btnOrderHandler('front')}>
            앞
          </Button>
          <Button height={'6rem'} onClick={() => ''}></Button>
        </CC.RowDiv>
      </CC.ColumnDiv>
      <CC.ColumnDiv>
        <CC.RowDiv gap={10}>
          <Button height={'6rem'} onClick={() => btnOrderHandler('left')}>
            좌
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('catch')}>
            {motorAngs.motor6 > 120 ? '잡기' : '놓기'}
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('right')}>
            우
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('up')}>
            상
          </Button>
        </CC.RowDiv>
      </CC.ColumnDiv>
      <CC.ColumnDiv>
        <CC.RowDiv gap={10}>
          <Button height={'6rem'} onClick={() => ''}>
            E
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('back')}>
            뒤
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('init')}>
            초기화
          </Button>
          <Button height={'6rem'} onClick={() => btnOrderHandler('down')}>
            하
          </Button>
        </CC.RowDiv>
      </CC.ColumnDiv>
      <div> {'현재 들어온 데이터 : '} </div>
      <div className="rxd">
        <textarea id="rxConsole" readOnly></textarea>
      </div>
      <CC.ColumnDiv gap={10}>
        <CC.RowDiv gap={10}>
          <span> 모터 1번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor1}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor1: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowDiv gap={10}>
          <span> 모터 2번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor2}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor2: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowDiv gap={10}>
          <span> 모터 3번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor3}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor3: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowDiv gap={10}>
          <span> 모터 4번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor4}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor4: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowDiv gap={10}>
          <span> 모터 5번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor5}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor5: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowDiv gap={10}>
          <span> 모터 6번 : </span>
          <input
            type={'number'}
            value={tempMotorAngs.motor6}
            className={'input-motor'}
            onChange={(e: any) => {
              setTempMotorAngs({ ...tempMotorAngs, motor6: e.target.value });
            }}
          />
        </CC.RowDiv>
        <CC.RowCenterDiv>
          <Button
            onClick={() => onChangeMotorAngs()}
            width={'100%'}
            height={'4rem'}
          >
            변경
          </Button>
        </CC.RowCenterDiv>
      </CC.ColumnDiv>
      <div>
        {Object.keys(motorAngs).map((i, _) => (
          <div key="index">
            {i} {motorAngs[i]}
          </div>
        ))}
      </div>
      <CC.RowCenterDiv>
        <Button onClick={() => sendMotorAngs()} width={'26rem'} height={'4rem'}>
          전송
        </Button>
      </CC.RowCenterDiv>
    </Container>
  );
};
export default SolveRender;
SolveRender.layout = Layout1;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;
