const Card = (props) => {
    return (
        <>
            <div id={`protofolio-${props.id}`} data-name={props.name} className="max-w-20 ">
                <img src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" />
            </div>
        </>
    )
}

export default Card