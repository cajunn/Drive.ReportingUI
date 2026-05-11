            // 0 Expanded
            // 1 <th>Id</th>
            // 2 <th>Event Timestamp</th>
            // 3 <th>Entity Type</th>
            // 4 <th>Event Type</th>
            // 5 <th>Version</th>
            // 6 <th>Actor Id</th>
            // 7 <th>Actor Type</th>
            // 8 <th>Correlation Id</th>
            // 9 <th>Entity Data </th>



$(function () {
    const table = $('#businessEventsTable'); 

    if (table.length) {
        table.DataTable({
            pageLength: 25,
            order: [[1, 'desc']],

            columnDefs: [
                {
                    targets: 0,
                    orderable: false,
                    searchable: false,
                    className: 'dt-control'
                },
                {
                    targets: 9,
                    visible: false,
                    searchable: true
                },
                {
                    target: [3, 4],
                    columnControl: ['order', ['searchList']]
                }
            ],

            ordering: {
                indicators: false,
                handler: false
            }
        });

        tableElement.on('click', 'td.dt-control', function () {
            const tr = $(this).closest('tr');
            const row = dataTable.row(tr);

            if (row.child.isShown()) {
                row.child.hide();
                tr.removeClass('shown');
                return;
            }

            const rowData = row.data();
            const entityData = rowData[9];

            row.child(formatEntityData(entityData)).show();
            tr.addClass('shown');
        });
    }
});

function formatEntityData(entityData) {
    return `
        <div class="entity-data-details">
            <strong>Entity Data</strong>
            <div>${entityData}</div>
        </div>
    `;
}


