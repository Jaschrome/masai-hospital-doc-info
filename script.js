document.addEventListener("DOMContentLoaded", function () {
    var doctorForm = document.getElementById("doctor-form");
    var doctorTableBody = document.getElementById("doctor-body");
    var specializationFilter = document.getElementById("filter");

    doctorForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(doctorForm);
        var tableRow = createTableRow(formData);
        doctorTableBody.appendChild(tableRow);
        doctorForm.reset();
    });

    specializationFilter.addEventListener("change", function () {
        var selectedSpecialization = specializationFilter.value;
        filterTableRows(selectedSpecialization);
    });

    function createTableRow(formData) {
        var tableRow = document.createElement("tr");

        for (var formEntry of formData.entries()) {
            var tableCell = document.createElement("td");
            tableCell.textContent = formEntry[1];
            tableRow.appendChild(tableCell);
        }

        var experience = formData.get("experience");
        var roleCell = document.createElement("td");
        roleCell.textContent = determineRole(experience);
        tableRow.appendChild(roleCell);

        var deleteCell = document.createElement("td");
        var deleteButton = createDeleteButton(tableRow);
        deleteCell.appendChild(deleteButton);
        tableRow.appendChild(deleteCell);

        // Apply styles to the new row
        applyRowStyles(tableRow);

        return tableRow;
    }

    function determineRole(experience) {
        if (experience > 5) {
            return "Senior";
        } else if (experience > 1) {
            return "Junior";
        } else {
            return "Trainee";
        }
    }

    function createDeleteButton(row) {
        var button = document.createElement("button");
        button.textContent = "Delete";
        button.addEventListener("click", function () {
            doctorTableBody.removeChild(row);
        });
        return button;
    }

    function applyRowStyles(row) {
        row.style.backgroundColor = "#f4f4f4";
        row.style.transition = "background-color 0.3s";
    }

    function filterTableRows(selectedSpecialization) {
        for (var row of doctorTableBody.rows) {
            var specializationCell = row.cells[2];
            if (selectedSpecialization === specializationCell.textContent || selectedSpecialization === "All") {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        }
    }
});

