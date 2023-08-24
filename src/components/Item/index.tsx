import './index.scss';

interface ItemProps {
    className?: string;
    title?: string;
    body?: string;
    id?: number | string | undefined;
    img?: string;
}

const Item = (props: ItemProps): JSX.Element => {
    return (
        <div className={props.className} key={props.id}>
            {props.title && <h3 className="item-title">{props.title}</h3>}
            {props.body && (
                <p className="item-body">
                    {props.body} <hr />
                </p>
            )}
            {props.img && <img src={props.img} alt={props.title} />}
        </div>
    );
};

export default Item;
