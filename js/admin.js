/* =========================================================
   ADMIN DASHBOARD MODULE
   Static/mock admin view — reads yacht count from the single
   fleet data source and renders a mock recent bookings table.
   No real backend; this page is a UI reference implementation
   only, matching the supplied mockup panel.
   ========================================================= */
(function () {
  'use strict';
  window.VIPYachtsPages = window.VIPYachtsPages || {};

  window.VIPYachtsPages.admin = function () {
    var data = window.VIPYachts;
    var qs = window.VIPYachtsUtil.qs;

    qs('#stat-total-yachts').textContent = data.YACHTS.length;

    var mockBookings = [
      { customer: 'Aswin Krishna R', yacht: data.YACHTS[0].name, date: '12 Aug', status: 'Pending' },
      { customer: 'Meera Nair', yacht: data.YACHTS[1] ? data.YACHTS[1].name : data.YACHTS[0].name, date: '10 Aug', status: 'Confirmed' },
      { customer: 'Rahul S', yacht: data.YACHTS[2] ? data.YACHTS[2].name : data.YACHTS[0].name, date: '08 Aug', status: 'Completed' },
      { customer: 'Fatima Al Suwaidi', yacht: data.YACHTS[4] ? data.YACHTS[4].name : data.YACHTS[0].name, date: '05 Aug', status: 'Confirmed' },
      { customer: 'James Whitfield', yacht: data.YACHTS[3] ? data.YACHTS[3].name : data.YACHTS[0].name, date: '02 Aug', status: 'Completed' }
    ];

    var statusClass = { Pending: 'badge-pending', Confirmed: 'badge-success', Completed: 'badge-gold' };

    qs('#admin-bookings-body').innerHTML = mockBookings.map(function (b) {
      return (
        '<tr>' +
          '<td>' + b.customer + '</td>' +
          '<td>' + b.yacht + '</td>' +
          '<td>' + b.date + '</td>' +
          '<td><span class="badge ' + (statusClass[b.status] || 'badge-gold') + '">' + b.status + '</span></td>' +
        '</tr>'
      );
    }).join('');
  };
})();
