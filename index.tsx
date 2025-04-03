import React from 'react';

interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    colors?: string[]; // Добавлено для расширяемости, если потребуется
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: { [key: number]: string }; // Хранит значения параметров по их id
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        // Инициализируем состояние значениями из модели
        const initialValues: { [key: number]: string } = {};
        props.model.paramValues.forEach(paramValue => {
            initialValues[paramValue.paramId] = paramValue.value;
        });

        this.state = {
            paramValues: initialValues,
        };
    }

    // Метод для получения полной структуры модели
    public getModel(): Model {
        const paramValues: ParamValue[] = Object.keys(this.state.paramValues).map(key => ({
            paramId: Number(key),
            value: this.state.paramValues[Number(key)],
        }));

        return {
            paramValues,
            colors: [], // Можно добавить логику для работы с цветами, если потребуется
        };
    }

    // Обработчик изменения значения параметра
    private handleChange = (paramId: number, value: string) => {
        this.setState(prevState => ({
            paramValues: {
                ...prevState.paramValues,
                [paramId]: value,
            },
        }));
    };

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <div>
                {params.map(param => (
                    <div key={param.id}>
                        <label>{param.name}:</label>
                        <input
                            type="text"
                            value={paramValues[param.id] || ''}
                            onChange={(e) => this.handleChange(param.id, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default ParamEditor;
