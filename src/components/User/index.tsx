import { useState } from 'react';
import './index.scss';

interface UserProps {
    className?: string;
    name?: string;
    id?: number | string | undefined;
    img?: string;
}

const User = (props: UserProps): JSX.Element => {
    const [name, setName] = useState('');

    return (
        <div className={props.className} key={props.id}>
            {props.img && <img src={props.img} alt={props.name} />}
            {props.name && <h3 className="User-title">{props.name}</h3>}
        </div>
    );
};

export default User;
