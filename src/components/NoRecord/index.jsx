import "./norecord.scss";

const NoRecord = ({message}) => {
  return (
    <div className='norecord'>
        <span className='norecord_text'>{message ?? "Kayıt bulunamadı"}</span>
    </div>
  )
}

export default NoRecord