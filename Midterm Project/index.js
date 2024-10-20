document.addEventListener("DOMContentLoaded", () => {
  const incomeForm = document.getElementById("incomeForm");
  const expenseForm = document.getElementById("expenseForm");

  if (incomeForm) {
    incomeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const incomeAmount = parseFloat(
        document.getElementById("incomeAmount").value
      );
      let totalIncome = parseFloat(
        document.getElementById("totalIncome").textContent.replace("$", "")
      );
      totalIncome += incomeAmount;
      document.getElementById("totalIncome").textContent = `$${totalIncome}`;
      updateIncomeChart(incomeAmount);

      await sendDataToServer({ type: "income", amount: incomeAmount });

      event.target.reset();
    });

    const ctx2 = document.getElementById("incomeChart").getContext("2d");
    let incomeChart = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: ["Income"],
        datasets: [
          {
            data: [0],
            backgroundColor: ["#36a2eb"],
          },
        ],
      },
    });

    window.updateIncomeChart = (amount) => {
      incomeChart.data.datasets[0].data[0] += amount;
      incomeChart.update();
    };
  }

  if (expenseForm) {
    expenseForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const expenseAmount = parseFloat(
        document.getElementById("expenseAmount").value
      );
      let totalExpenses = parseFloat(
        document.getElementById("totalExpenses").textContent.replace("$", "")
      );
      totalExpenses += expenseAmount;
      document.getElementById(
        "totalExpenses"
      ).textContent = `$${totalExpenses}`;

      // Subtract expense from total income
      let totalIncome = parseFloat(
        document.getElementById("totalIncome").textContent.replace("$", "")
      );
      totalIncome -= expenseAmount;
      document.getElementById("totalIncome").textContent = `$${totalIncome}`;

      updateExpenseChart(expenseAmount);

      await sendDataToServer({ type: "expense", amount: expenseAmount });

      event.target.reset();
    });

    const ctx1 = document.getElementById("expenseChart").getContext("2d");
    let expenseChart = new Chart(ctx1, {
      type: "pie",
      data: {
        labels: ["Expenses"],
        datasets: [
          {
            data: [0],
            backgroundColor: ["#ff6384"],
          },
        ],
      },
    });

    window.updateExpenseChart = (amount) => {
      expenseChart.data.datasets[0].data[0] += amount;
      expenseChart.update();
    };
  }
});

// Function to simulate sending data to server
async function sendDataToServer(data) {
  try {
    const response = await fetch("https://example.com/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}