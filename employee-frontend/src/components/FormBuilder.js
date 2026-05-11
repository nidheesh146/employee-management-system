import React, { useState,useEffect } from 'react';
import api from '../Services/api';
import {
    DragDropContext,
    Droppable,
    Draggable
} from 'react-beautiful-dnd';


function FormBuilder() {

    const [title, setTitle] = useState('');
    const [fields, setFields] = useState([
        
        {
            label: '',
            field_type: 'text'
        }
    ]);

    const [savedForms, setSavedForms] = useState([]);
    useEffect(() => {

        fetchForms();

    }, []);
    const addField = () => {

    setFields([
        ...fields,
        {
            label: '',
            field_type: 'text'
        }
    ]);
};
const handleFieldChange = (index, key, value) => {

    const updatedFields = [...fields];

    updatedFields[index][key] = value;

    setFields(updatedFields);
};
const handleDragEnd = (result) => {

    if (!result.destination) return;

    const items = Array.from(fields);

    const [reorderedItem] = items.splice(
        result.source.index,
        1
    );

    items.splice(
        result.destination.index,
        0,
        reorderedItem
    );

    setFields(items);
};

const saveForm = async () => {
    console.log(fields);
    const filteredFields = fields.filter(
        field => field.label.trim() !== ''
    );


    const data = {
        title,
    fields: filteredFields
    };

    await api.post('employees/forms/', data);
    fetchForms()

    alert('Form Created');
};

const fetchForms = async () => {

    const response = await api.get('employees/forms/');

    setSavedForms(response.data);
};

    return (
    <div className="container mt-4">

        <h2>Create Dynamic Form</h2>

        <input
            type="text"
            placeholder="Form Title"
            className="form-control mb-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />

        <DragDropContext onDragEnd={handleDragEnd}>

            <Droppable droppableId="fields">

            {(provided) => (

            <div
                {...provided.droppableProps}
                ref={provided.innerRef}
            >

            {
            fields.map((field, index) => (

            <Draggable 
                key={`field-${index}`}
                draggableId={`field-${index}`}
                index={index}
            >

            {(provided) => (

            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="border p-3 mb-3 rounded"
            >

                <input
                    type="text"
                    placeholder="Field Label"
                    className="form-control mb-2"
                    value={field.label}
                    onChange={(e) =>
                        handleFieldChange(
                            index,
                            'label',
                            e.target.value
                        )
                    }
                />

                <select
                    className="form-control"
                    value={field.field_type}
                    onChange={(e) =>
                        handleFieldChange(
                            index,
                            'field_type',
                            e.target.value
                        )
                    }
                >

                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="date">Date</option>
                    <option value="password">Password</option>

                </select>

            </div>

            )}

            </Draggable>

            ))
            }

            {provided.placeholder}

            </div>

            )}

            </Droppable>

            </DragDropContext>

        <button
            className="btn btn-secondary mb-3"
            onClick={addField}
        >
            Add Field
        </button>
        <button
    className="btn btn-primary ms-2"
    onClick={saveForm}
>

    Save Form

</button>

<h3 className="mt-4">
    Saved Forms
</h3>

{
savedForms.map((form) => (

    <div
        key={form.id}
        className="border p-2 mb-2 rounded"
    >

        <h5>{form.title}</h5>

        <p>
            {
            form.fields.map((field) => (

                <div key={field.id}>

                    {field.label} - {field.field_type}

                </div>

            ))
            }  
        </p>

    </div>

))
}

    </div>
);
}

export default FormBuilder;