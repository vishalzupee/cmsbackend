'use client';
import React, { useEffect, useState } from 'react';
import styles from './DraggableForm.module.css';
import TextInput from './LeftComponents/TextInput';
import dashboardStyle from '@/styles/dashboard.module.css'
import { Form } from 'formik';

type fieldProps = {
    name?:string;
    type?:string;
    label?:string;
    id?: number;
}


export default function DraggableVanillaForm() {

const [fieldsData, setFieldsData] = useState<fieldProps[]>([]);
const [fieldCount, setFieldCount] = useState(1);

const addFields = () =>{
    const fieldsUpdatedData = [...fieldsData, {name:'input_type_field[]', type: 'text', label: 'Field'+fieldCount,id:fieldCount}];
    setFieldsData(fieldsUpdatedData);
    setFieldCount(fieldCount+1);
}



  useEffect(() => {
    const draggables = document.querySelectorAll('.draggable');
    const containers = document.querySelectorAll('.container');

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });

      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const dragging = document.querySelector('.dragging');
        if (afterElement == null) {
          container.appendChild(dragging);
        } else {
          container.insertBefore(dragging, afterElement);
        }
      });
    });
}, [fieldsData]);

    function getDragAfterElement(container, y) {
      const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

      return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  
    const jsonFormDataSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
     e.preventDefault();
     const formData = new FormData(e.currentTarget);
     const objectFormData = Object.fromEntries(formData.entries());

     const groupedFormData: Record<string, string[]> = {};

    formData.forEach((value, key) => {
      if (!groupedFormData[key]) {
        groupedFormData[key] = [];
      }
      groupedFormData[key].push(value as string);
    });


     console.log(groupedFormData);
    }

  return (
    <div className='dragable__layout__wrapper__main'>
    
    <div className={` ${dashboardStyle.add__wrapper__button__section} ${dashboardStyle.display__block} ${dashboardStyle['p-20']} ${dashboardStyle.text__align__right}`}><button className={`${dashboardStyle.btn__primary}`} onClick={addFields}>Add Fields</button></div>
    <div className={styles.formContainer}>
      <div className={`${styles.section} ${styles.leftSection} container`}>
        
        {fieldsData.map((flData, index)=> <TextInput key={flData.id} name={flData.name} label={flData.label} type={flData.type} className={`${styles.draggable} draggable`} draggable="true" /> )}
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 3</div>*/}
      </div>
      <form onSubmit={jsonFormDataSubmit} className={`${dashboardStyle.dragable_container_full_with}`}>
      <div className={`${styles.section} ${styles.rightSection} container ${dashboardStyle.width100}`}>
       {/* <div className={`${styles.draggable} draggable`} draggable="true">Field 4</div>
        <div className={`${styles.draggable} draggable`} draggable="true">Field 5</div>
        <div className={`${styles.draggable} draggable`} draggable="true">Field 6</div>*/}
      </div>
      <input type='submit' name='jsonsubmit' value="Submit" className={`${dashboardStyle.btn__primary}`} />
      </form>
    </div>
    </div>
  );
}
