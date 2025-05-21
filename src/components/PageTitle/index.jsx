import './page_title.scss'

const PageTitle = ({title}) => {
    return(
        <div className='page_title_container'>
            <h2 className='page_title'>{title}</h2>
        </div>
    );
}

export default PageTitle;