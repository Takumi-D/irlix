"use strict";

let inputRecordNumberEl = document.querySelector(".block-input-text_input-record-number");
let inputRecordNameEl = document.querySelector(".block-input-text_input-record-name");
let buttonEl = document.querySelector(".form-button");
let listEl = document.querySelector(".list");
let arrEl = [];

function creatingAListItem(number = 0, text = '') {
    let markup = `
    <div class="list__item-container">
                <p class="list__item list__item_number">${number})</p>
                <p class="list__item">${text}</p>
            </div>
    `;
    return (markup);
}

function listClearing(){
    let allEl = document.querySelectorAll(".list__item-container");

    allEl.forEach((item) => {
        item.remove();
    })
}


function addingDataToTheList(){

    listClearing();

    arrEl.forEach((item) => {
        let markup = creatingAListItem(item.id, item.text);
        listEl.insertAdjacentHTML("beforeend", markup);
    })

}

function arraySorting(arr){
    if(arr.length > 1){
        arr.sort((item1, item2) => {
            if(Number(item1.id) > Number(item2.id)){
                return 1;
            }
            else if(Number(item1.id) < Number(item2.id)){
                return -1;
            }
        })
    }

}

function checkDorMatchingNumber(arr, obj){
    let key = 1;
    arr.map((item) => {
        if(item.id === obj.id){
            let res = confirm(`Заменить номер записи: ${item.id}) ${item.text} на ${obj.id}) ${obj.text}`);
            if(res === true){
                item.id = obj.id;
                item.text = obj.text;
                key = 3;
            }
            else{
                key = 2
            }
        }
    })
    return key;
}

function creationList(){
    let obj = {id: inputRecordNumberEl.value, text: inputRecordNameEl.value}
    let key = checkDorMatchingNumber(arrEl, obj);

    if(key === 1){
        arrEl.push(obj);

    }
    else if(key === 2){
        return;
    }
    arraySorting(arrEl);
    addingDataToTheList();


}


buttonEl.addEventListener("click", (event) => {
    if(inputRecordNumberEl.value === "" ||  inputRecordNameEl.value === "" ){
        return
    }
    else{
        creationList();
    }
    inputRecordNumberEl.value = '';
    inputRecordNameEl.value = '';
})
