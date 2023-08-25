import { useState } from 'react';
import './index.scss';
import Input from '../UI/Input';

interface UserProps {
    className?: string;
    name?: string;
    id?: number | string | undefined;
    img?: string;
}

const User = (props: UserProps): JSX.Element => {
    const [name, setName] = useState<any>(props.name);
    const handleValue = async (title: string) => {
        setName(title);
    };

    return (
        <div className={props.className} key={props.id}>
            {props.img && <img src={props.img} alt={props.name} />}
            {props.name && <h3 className="User-title">{name}</h3>}
            {/* {props.id === '66' && (
                <Input
                    value={name}
                    placeholder={name}
                    onClick={() => handleValue(name)}
                    onChange={(e) => setName(e.target.value)}
                />
            )} */}
        </div>
    );
};

export default User;
