import { store } from '@/redux/store';
import theme from '@/styles/theme';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import BasicCustomModal from './BasicCustomModal';
import { CC } from '../../../styles/commonComponentStyle';
import Input from '@/components/common/input/Input';
import Space from '@/components/common/space/Space';

type FirstCategoryTypes = {
  id: number;
  name: string;
  firstHref: string;
  line: number;
  position: number;
  count: number;
};

const ModalFirstCategory = (modalHandler: any) => {
  const [name, setName] = useState('');
  const [firstHref, setFirstHref] = useState('');
  const [line, setLine] = useState(0);
  const [removeFirstHref, setRemoveFirstHref] = useState('');
  const [updateFirstHref, setUpdateFirstHref] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [firstCategory, setFirstCategory] = useState<FirstCategoryTypes[]>([]);

  const submitHandler = async () => {
    if (name === '' || name === 'null') {
      alert('카테고리명을 입력하세요');
    } else if (firstHref === '') {
      alert('경로를 입력하세요');
    } else if (line < 1 && line > 4) {
      alert('라인은 1~4의 숫자를 넣어야 합니다.');
    } else {
      await AxiosInstance({
        url: '/api/first-category',
        method: 'POST',
        data: {
          name: name,
          firstHref: '/' + firstHref,
          line: line,
          nickName: store.getState().authStore.nickname,
        },
      })
        .then(response => {
          alert('첫번째 카테고리가 작성되었습니다.');
        })
        .catch(error => {
          alert('에러가 발생하였습니다.');
        });
    }
  };
  const removeHandler = async () => {
    if (removeFirstHref === '' || removeFirstHref === 'null') {
      alert('삭제할 URL을 입력하세요');
    } else {
      await AxiosInstance({
        url: '/api/first-category',
        method: 'DELETE',
        data: {
          firstHref: removeFirstHref,
        },
      })
        .then(response => {
          setFirstCategory(
            firstCategory.filter((el: any) => el.firstHref !== removeFirstHref)
          );
          alert('카테고리가 삭제되었습니다.');
        })
        .catch(error => {
          alert('에러가 발생하였습니다.');
        });
    }
  };

  const updateCategoryNameHadler = () => {
    console.log('ModalFirstCategory.tsx : ', updateFirstHref);
    if (updateName === '' || updateName === 'null') {
      alert('변경할 이름을 입력하세요');
    } else {
      AxiosInstance({
        url: '/api/first-category',
        method: 'PUT',
        data: {
          firstHref: updateFirstHref,
          updateName: updateName,
        },
      })
        .then(response => {
          setFirstCategory(
            firstCategory.map((el: any) =>
              el.firstHref !== updateFirstHref
                ? el
                : { ...el, name: updateName }
            )
          );
          alert('카테고리 이름이 변경되었습니다.');
        })
        .catch(error => {
          alert('에러가 발생하였습니다.');
        });
    }
  };

  useEffect(() => {
    AxiosInstance({
      url: '/api/first-category',
      method: 'GET',
    })
      .then(response => {
        setFirstCategory(response.data.data.firstCategory);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Overlay onClick={() => modalHandler.modalHandler()} />
      <Container>
        <Container1>
          <FormContainer>
            <CC.RowCenterDiv
              height="30px"
              color="#fff"
              fontSize={theme.fontSizes.lg}
              padding={'10px 0px 0px 0px'}
            >
              1차 카테고리 추가
            </CC.RowCenterDiv>
            <CC.ColumnDiv
              gap={20}
              padding={'20px 20px 20px 20px'}
              color={'#fff'}
            >
              <Space title4="카테고리 이름" titleWidth={'140px'} gap={6}>
                <Input
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  placeholder="카테고리명을 입력하세요."
                />
              </Space>
              <Space title4="카테고리 경로" titleWidth={'140px'} gap={6}>
                <Input
                  value={firstHref}
                  onChange={e => {
                    setFirstHref(e.target.value);
                  }}
                  placeholder="영어와'-'만 이용해서 경로를 입력하세요"
                />
              </Space>
              <Space title4="메뉴" titleWidth={'140px'} gap={6}>
                <RadioDiv>
                  <CC.RowDiv gap={22}>
                    <div>
                      <input
                        type="radio"
                        name="menu"
                        value="1"
                        id="frontend"
                        onChange={(e: any) => setLine(e.target.value)}
                        checked
                      />
                      <label htmlFor="frontend"> 프론트엔드 </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="menu"
                        value="2"
                        id="backend"
                        onChange={(e: any) => setLine(e.target.value)}
                      />
                      <label htmlFor="backend"> 백엔드 </label>
                    </div>
                  </CC.RowDiv>
                  <CC.RowDiv gap={80}>
                    <div>
                      <input
                        type="radio"
                        name="menu"
                        value="3"
                        id="server"
                        onChange={(e: any) => setLine(e.target.value)}
                      />
                      <label htmlFor="server"> 서버 </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="menu"
                        value="4"
                        id="etc"
                        onChange={(e: any) => setLine(e.target.value)}
                      />
                      <label htmlFor="etc"> 기타 </label>
                    </div>
                  </CC.RowDiv>
                </RadioDiv>
              </Space>
              <Button onClick={() => submitHandler()}>제출</Button>
              <CC.RowDiv border={'solid #aeaeae 3px'} />
              <CC.RowCenterDiv
                height="30px"
                color="#fff"
                fontSize={theme.fontSizes.lg}
                padding={'10px 0px 0px 0px'}
              >
                1차 카테고리 삭제
              </CC.RowCenterDiv>
              <InputContainer>
                <select
                  name="firstHref"
                  onChange={(e: any) => setRemoveFirstHref(e.target.value)}
                >
                  <option value={'null'} selected disabled>
                    삭제할 경로를 선택해주세요.
                  </option>
                  {firstCategory.map((el: any, index: number) => (
                    <option key={index} value={el.firstHref}>
                      {el.name} - {el.firstHref}
                    </option>
                  ))}
                </select>
              </InputContainer>
              <Button onClick={() => removeHandler()}>삭제</Button>
              <CC.RowCenterDiv
                height="30px"
                color="#fff"
                fontSize={theme.fontSizes.lg}
                padding={'10px 0px 0px 0px'}
              >
                1차 카테고리 이름 변경
              </CC.RowCenterDiv>
              <InputContainer>
                <select
                  name="firstHref"
                  onChange={(e: any) => setUpdateFirstHref(e.target.value)}
                >
                  <option value={'null'} selected disabled>
                    변경할 이름를 선택해주세요.
                  </option>
                  {firstCategory.map((el: any, index: number) => (
                    <option key={index} value={el.firstHref}>
                      이름 : {el.name} - 경로 : {el.firstHref}
                    </option>
                  ))}
                </select>
              </InputContainer>
              <Space title4="변경할 이름" titleWidth={'140px'} gap={6}>
                <Input
                  placeholder="변경할 이름"
                  onChange={(e: any) =>
                    // setChangeFirstCategoryName(e.target.value)
                    setUpdateName(e.target.value)
                  }
                />
              </Space>
            </CC.ColumnDiv>
            <CC.RowDiv gap={10} padding={'10px'}>
              <Button onClick={updateCategoryNameHadler}>변경</Button>
              <Button onClick={() => modalHandler.modalHandler()}>취소</Button>
            </CC.RowDiv>
          </FormContainer>
        </Container1>
      </Container>
    </>
  );
};

export default ModalFirstCategory;

const UpDownAnimation = keyframes`
        from {
          opacity: 0;
          transform: translate(0, 0);
          border-radius: 0px 0px 0px 0px;
        }
        
        to {
            opacity: 1;
            transform: translate(10px, 10px);
            border-radius: 50px 0px 4px 4px;
        }
`;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.8);
  border: 0px;
  z-index: 300;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  position: fixed;
  top: 90px;
  left: 50vw;
  transform: translate(-50%, 0%);
  z-index: 10;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  min-width: 400px;
  height: calc(100% - 90px);
  padding: 10px;
`;
const Container1 = styled.div`
  background: ${theme.backgroundColors.orange};
  border-radius: 50px 4px 4px 4px;
  min-height: 500px;
  z-index: 3;
`;
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColors.purple};
  animation: ${UpDownAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 3fr 2fr);
  color: ${theme.backgroundColors.purpleDark};
  height: 40px;
`;
const RadioDiv = styled(CC.ColumnDiv)`
  gap: 4px;
  input[type='radio'],
  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: ${theme.backgroundColors.purpleDark};
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    color: ${theme.backgroundColors.purpleDark};
    background: white;
  }
`;
