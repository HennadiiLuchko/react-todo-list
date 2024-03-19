import {useState} from 'react';

export default function Item({title, id, status}){

    const [checked, setChecked] = useState(status);
    const classes = ['todo'];

    if (checked) {
        classes.push('status');
    }

    const updateStatus = () => {
        setChecked(!checked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map((el)=>{
            if(el.id === id){
                el.status = !checked;
            }
            return true
        })
        localStorage.setItem('tasks',JSON.stringify(storedTodos));
    }

    const [visible,setVisible] = useState(true);

    const removeElement = () => {
        setVisible(prev => !prev);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let removeTodos = storedTodos.filter(item => {
            if(item.id !== id){
                return true
            }
            return false
        });
        localStorage.setItem('tasks',JSON.stringify(removeTodos));
    }

    const date = new Date();
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return (
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <label>
                        <input type="checkbox"
                        checked={checked}
                        onChange={updateStatus} />
                        <span>{hour + ':' + minute + ', ' + month + ' ' + day + ', ' + year + ' ' + title}</span>
                        <i className="material-icons red-text"
                        onClick={removeElement}
                        >
                            X
                        </i>
                    </label>
                </li>
            )}
        </>
    )
}