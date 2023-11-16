import './MenuPage.scss'

const MenuPage = () => {
    return (
      <div className='container'>
        <div className='menu-page'>
            <div className='menu-page-item' onClick={() => {window.location.pathname = '/cameras'}}>Наблюдение</div>
            <div className='menu-page-item' onClick={() => {window.location.pathname = '/events'}}>Просмотр отчетов</div>
        </div>
      </div>
    )
}

export default MenuPage