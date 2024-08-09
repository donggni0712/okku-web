const ErrorPage = () => {
  return (
    <>
      <div>
        <h1>죄송합니다. 예상치 못한 에러가 발생했습니다.</h1>
      </div>
      <div className="errorpage-button">
        <a href="https://open.kakao.com/o/g3EpAvFg" className="develop-button">
          <img src="assets/develop.png" />
          개발에 간섭하기
        </a>
        <a href="https://open.kakao.com/o/g3EpAvFg" className="bug-button">
          <img src="assets/bug.png" />
          버그 제보하기
        </a>
      </div>
      <div className="errorpage-button">
        <a href="https://open.kakao.com/o/g3EpAvFg" className="shopping-button">
          <img src="assets/shopping.png" />
          쇼핑몰 추가해달라고 하기
        </a>
      </div>
      <div>죄송합니다. 예상치 못한 에러가 발생했습니다.</div>
    </>
  );
};

export default ErrorPage;
