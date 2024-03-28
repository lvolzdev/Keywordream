import instance from "./baseApi";

// 로그인(닉네임이 없다면 회원가입)
export const login = async (nickName) => {
    try {
      const response = await instance.post(`/users/login`, { nickName: nickName }); 
      return response.data;
    } catch (error) {
      console.error('로그인 실패');
      throw error;
    }
};
