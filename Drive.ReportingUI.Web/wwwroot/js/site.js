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
        const dataTable = table.DataTable({
            pageLength: 25,
            order: [[2, 'desc']],

            layout: {
                topStart: ['pageLength', {
                    buttons: [
                        {
                            extend: 'csvHtml5',
                            text: 'Export CSV',
                            className: 'btn btn-primary btn-sm',
                            filename: 'business_events_export',
                        }
                    ]
                }],
                topEnd: 'search',
                bottomEnd: 'paging'
            },

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
                    target: [3, 4, 7],
                    columnControl: ['order', ['searchList']]
                },
                {
                    target: [2],
                    columnControl: ['order']
                }
            ],

            ordering: {
                indicators: false,
                handler: false
            }
        });

        table.on('click', 'td.dt-control', function () {
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

let metadataTable;

$(document).on('click', '.event-metadata-link', function (e) {
    e.preventDefault();

    const eventId = $(this).data('event-id');

    $('#metadataModalLabel').text(`Metadata for Event ${eventId}`);

    if (metadataTable) {
        metadataTable.destroy();
        $('#metadataTable tbody').empty();
    }

    metadataTable = $('#metadataTable').DataTable({
        ajax: {
            url: `/BusinessEvent/Metadata?eventId=${eventId}`,
            dataSrc: ''
        },
        columns: [
            { data: 'entityId' },
            { data: 'entityType' },
            { data: 'metadataKey' },
            { data: 'metadataValue' },
            { data: 'dataType' }
        ],

        paging: false,
        searching: false, 
        info: false,
        lengthChange: false,
        pageLength: 50,

        initComplete: function (settings, json) {
            const rowCount = json.leghth || 0;
            const dialog = $('metadataModalDialog');

            dialog.removeClass('modal-lg modal-xl modal-fullscreen');

            if (rowCount > 20) {
                dialog.addClass('modal-xl');
            }

            if (rowCount > 50) {
                dialog.addClass('modal-fulscreen');
            }
        }
    });

    const modal = new bootstrap.Modal(document.getElementById('metadataModal'));
    modal.show();
});
