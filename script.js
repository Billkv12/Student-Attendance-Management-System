// ADD STUDENT FORM
if (document.getElementById("studentForm")) {

    document.getElementById("studentForm").addEventListener("submit", function(e){
        e.preventDefault();

        let name = document.getElementById("name").value;
        let studentClass = document.getElementById("class").value;
        let gender = document.getElementById("gender").value;

        let students = JSON.parse(localStorage.getItem("students")) || [];

        let newStudent = {
            name: name,
            class: studentClass,
            gender: gender
        };

        students.push(newStudent);

        localStorage.setItem("students", JSON.stringify(students));

        alert("Student added successfully!");

        document.getElementById("studentForm").reset();
    });

}



// LOAD STUDENTS INTO DROPDOWN
if (document.getElementById("studentSelect")) {

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let dropdown = document.getElementById("studentSelect");

    dropdown.innerHTML = `<option value="">Select a student</option>`;

    students.forEach(function(student, index) {
        let option = document.createElement("option");
        option.value = index;
        option.text = student.name + " (" + student.class + ")";
        dropdown.appendChild(option);
    });

}



// SAVE ATTENDANCE
if (document.getElementById("attendanceForm")) {

    document.getElementById("attendanceForm").addEventListener("submit", function(e){
        e.preventDefault();

        let studentIndex = document.getElementById("studentSelect").value;
        let date = document.getElementById("date").value;
        let status = document.getElementById("status").value;

        let students = JSON.parse(localStorage.getItem("students")) || [];
        let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

        let record = {
            name: students[studentIndex].name,
            class: students[studentIndex].class,
            date: date,
            status: status
        };

        attendance.push(record);

        localStorage.setItem("attendance", JSON.stringify(attendance));

        alert("Attendance saved successfully!");
        document.getElementById("attendanceForm").reset();
    });

}
// DISPLAY ATTENDANCE RECORDS
if (document.getElementById("attendanceTable")) {

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let table = document.getElementById("attendanceTable").getElementsByTagName("tbody")[0];
attendance.forEach(function(record, index) {

    let row = table.insertRow();

    row.innerHTML = `
        <td>${record.name}</td>
        <td>${record.class}</td>
        <td>${record.date}</td>
        <td>${record.status}</td>
        <td><button onclick="deleteRecord(${index})">Delete</button></td>
    `;
});
function deleteRecord(index) {

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    attendance.splice(index, 1);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    location.reload();
}

}
// ATTENDANCE SUMMARY
if (document.getElementById("presentCount")) {

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let present = 0;
    let absent = 0;
    let late = 0;

    attendance.forEach(function(record) {

        if (record.status === "Present") {
            present++;
        } 
        else if (record.status === "Absent") {
            absent++;
        } 
        else if (record.status === "Late") {
            late++;
        }

    });

    document.getElementById("presentCount").textContent = present;
    document.getElementById("absentCount").textContent = absent;
    document.getElementById("lateCount").textContent = late;
}
