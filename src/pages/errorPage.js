const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>죄송합니다. 예상치 못한 에러가 발생했습니다.</h1>

      <div className="errorpage-buttons">
        <a
          href="https://open.kakao.com/o/g3EpAvFg"
          className="button develop-button"
        >
          <img src="assets/develop.png" alt="개발 간섭하기" />
          개발에 간섭하기
        </a>
        <a
          href="https://open.kakao.com/o/g3EpAvFg"
          className="button bug-button"
        >
          <img src="assets/bug.png" alt="버그 제보하기" />
          버그 제보하기
        </a>
        <a
          href="https://open.kakao.com/o/g3EpAvFg"
          className="button shopping-button"
        >
          <img src="assets/shopping.png" alt="쇼핑몰 추가 요청" />
          쇼핑몰 추가해달라고 하기
        </a>
      </div>

      <div className="error-footer">
        죄송합니다. 예상치 못한 에러가 발생했습니다.
      </div>
    </div>
  );
};

export default ErrorPage;
