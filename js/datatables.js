// ========================================
// DATATABLES INITIALIZATION
// ========================================
$(document).ready(function () {
  // Initialize DataTable if element exists
  if ($('#datatable-demo').length) {
    $('#datatable-demo').DataTable({
      pageLength: 5,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      language: {
        search: "🔍 Search:",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
        infoEmpty: "Showing 0 to 0 of 0 entries",
        infoFiltered: "(filtered from _MAX_ total entries)",
        paginate: {
          first: "First",
          previous: "← Previous",
          next: "Next →",
          last: "Last"
        },
        zeroRecords: "No matching records found",
        emptyTable: "No data available in table"
      },
      responsive: true,
      columnDefs: [
        { orderable: false, targets: [5] } // Disable sorting on Actions column
      ]
    });
  }
});