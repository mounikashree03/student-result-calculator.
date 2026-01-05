// Load latest saved result when page loads
document.addEventListener("DOMContentLoaded", () => {
    const results = JSON.parse(localStorage.getItem("studentResults")) || [];
    if (results.length > 0) {
        displayResult(results[results.length - 1]);
    }
});

function calculateResult() {
    const name = document.getElementById("name").value.trim();
    const m1 = Number(document.getElementById("m1").value);
    const m2 = Number(document.getElementById("m2").value);
    const m3 = Number(document.getElementById("m3").value);

    if (!name || m1 <= 0 || m2 <= 0 || m3 <= 0) {
        showAlert("Please enter all details correctly", "danger");
        return;
    }

    const total = m1 + m2 + m3;
    const avg = total / 3;

    let grade = "F";
    let status = "FAIL";

    // ❌ Fail if any subject mark < 35
    if (m1 < 35 || m2 < 35 || m3 < 35) {
        grade = "F";
        status = "FAIL";
    } else {
        status = "PASS";
        if (avg >= 80) grade = "A";
        else if (avg >= 60) grade = "B";
        else if (avg >= 40) grade = "C";
        else grade = "D";
    }

    const resultData = { name, total, avg, grade, status };

    displayResult(resultData);

    // ✅ Store all results (history)
    const results = JSON.parse(localStorage.getItem("studentResults")) || [];
    results.push(resultData);
    localStorage.setItem("studentResults", JSON.stringify(results));

    showAlert(
        status === "PASS"
            ? "Result calculated successfully!"
            : "Student has failed in one or more subjects",
        status === "PASS" ? "success" : "danger"
    );
}

function displayResult(data) {
    document.getElementById("result").innerHTML = `
        <strong>Name:</strong> ${data.name}<br>
        <strong>Total:</strong> ${data.total}<br>
        <strong>Average:</strong> ${data.avg.toFixed(2)}<br>
        <strong>Grade:</strong> ${data.grade}<br>
        <strong>Status:</strong>
        <span class="${data.status === "PASS" ? "text-success" : "text-danger"}">
            ${data.status}
        </span>
    `;
}

function showAlert(msg, type) {
    const box = document.getElementById("alertBox");
    box.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show">
            ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    setTimeout(() => box.innerHTML = "", 3000);
}
