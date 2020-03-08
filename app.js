const db=firebase.firestore();
const table=document.querySelector('#tbresult');
const form=document.querySelector('#addForm')

db.collection('menu').get().then((snapshot)=>{
    snapshot.forEach(doc=>{
            showData(doc);
    });
});

form.addEventListener('submit',(e)=>{
    //ไม่ให้รีหน้าใหม่อีกครั้ง
    e.preventDefault();

    db.collection('menu').add({
            name:form.name.value,
            price:form.price.value,
            สถานที่:form.สถานที่.value,
            category:form.category.value
    });
    form.name.value='',
    form.price.value='',
    form.สถานที่.value='',
    form.category.value='';
});

function showData(doc) {
    var row=table.insertRow(-1);
    var cell1=row.insertCell(0);
    var cell2=row.insertCell(1);
    var cell3=row.insertCell(2);
    var cell4=row.insertCell(3);
    var cell5=row.insertCell(4);
    
    cell1.innerHTML=doc.data().name;
    cell2.innerHTML=doc.data().price;
    cell3.innerHTML=doc.data().สถานที่;
    cell4.innerHTML=doc.data().category;
    let btn=document.createElement('button');
    btn.textContent='ลบข้อมูล';
    btn.setAttribute('class','btn btn-danger');
    btn.setAttribute('data-id',doc.id);
    let Ebtn=document.createElement('button');
    Ebtn.textContent='แก้ไขข้อมูล';
    Ebtn.setAttribute('class','btn btn-success');
    Ebtn.setAttribute('data-id',doc.id);
    cell5.appendChild(btn);
 

  

   btn.addEventListener('click',(e)=>{
        let id=e.target.getAttribute('data-id');
        db.collection('menu').doc(id).delete();
   });

  
}

