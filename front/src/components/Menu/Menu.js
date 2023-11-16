import './Menu.scss'

const Menu = () => {
    return (
        <div className='menu'>
            <div className='menu-item' onClick={() => {window.location.pathname = '/menu'}}>Меню</div>
            {
                window.location.pathname === '/events' && <div className='menu-item'>Просмотр отчетов</div>
            }
        </div>
    )
};

export default Menu