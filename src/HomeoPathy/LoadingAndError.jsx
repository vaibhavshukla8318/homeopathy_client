import style from "./css/loadingPage.module.css"

const Loading = () => {
  return (
    <div className={style.loadingPage}>
       <div className={style.spin}>
       </div>
       <p>Health</p>
    </div>
  )
};



export { Loading };
