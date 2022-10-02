import lodaer from '../assets/img/spinner.svg'

export const Loader = () => {
    return (
        <div className="loader-container">

            <img className="loader" src={lodaer} />
        </div>
    )
}