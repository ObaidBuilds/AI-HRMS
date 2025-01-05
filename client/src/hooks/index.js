
/* 
*
Custom hook for getting token from session storage 
*/
const useGetToken = () => {
  try {
    const token = sessionStorage.getItem("session");
    if (!token) return null;
    return token;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default useGetToken;
