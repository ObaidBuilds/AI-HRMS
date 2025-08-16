/* 
*
Custom hook for getting token from session storage 
*/
const getToken = () => {
  const remeber = localStorage.getItem("remember") === "true";

  try {
    const token = remeber
      ? localStorage.getItem("session")
      : sessionStorage.getItem("session");

    return token || null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

export default getToken;
