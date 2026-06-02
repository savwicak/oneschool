function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('hidden');
            modal.classList.add('animate-fade-in');
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.add('animate-fade-in');
            modal.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.style.animation = '';
            }, 300);
        }

        function showToast(message, type = 'success') {
            const toastContainer = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `px-6 py-4 rounded-lg text-white font-semibold shadow-lg animate-slide-in-right ${type === 'success' ? 'bg-green' : 'bg-pink'}`;
            toast.textContent = message;
            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 2500);
        }

        // Event Listeners
        document.getElementById('addActivityBtn').addEventListener('click', () => openModal('addActivityModal'));
        document.getElementById('addScheduleBtn').addEventListener('click', () => openModal('addActivityModal'));
        document.getElementById('joinClubBtn').addEventListener('click', () => openModal('joinClubModal'));
        document.getElementById('depositBtn').addEventListener('click', () => openModal('depositModal'));
        document.getElementById('withdrawBtn').addEventListener('click', () => openModal('withdrawModal'));
        document.getElementById('addAchievementBtn').addEventListener('click', () => openModal('addAchievementModal'));

        // Join Club Function
        function joinClub(clubName) {
            closeModal('joinClubModal');
            showToast(`Berhasil bergabung dengan Klub ${clubName}!`);
        }

        // Activity Functions
        function saveActivity() {
            const name = document.getElementById('activityName').value;
            const date = document.getElementById('activityDate').value;
            const time = document.getElementById('activityTime').value;

            if (!name || !date || !time) {
                showToast('Mohon isi semua field!', 'error');
                return;
            }

            const scheduleList = document.getElementById('scheduleList');
            const newItem = document.createElement('div');
            newItem.className = 'border-l-4 border-yellow pl-4 py-2 hover:bg-creame px-3 rounded transition';
            newItem.innerHTML = `
                <p class="font-semibold text-gray-800 text-sm sm:text-base">${name}</p>
                <p class="text-gray-500 text-xs sm:text-sm">${date} • ${time}</p>
            `;
            scheduleList.appendChild(newItem);

            closeModal('addActivityModal');
            document.getElementById('activityName').value = '';
            document.getElementById('activityDate').value = '';
            document.getElementById('activityTime').value = '';
            document.getElementById('activityDesc').value = '';

            showToast('Kegiatan berhasil ditambahkan!');
        }

        // Deposit Function
        function saveDeposit() {
            const amount = document.getElementById('depositAmount').value;
            if (!amount || amount <= 0) {
                showToast('Masukkan jumlah yang valid!', 'error');
                return;
            }

            const currentBalance = parseInt(document.getElementById('cashBalance').textContent.replace('Rp', '').replace('K', '000'));
            const newBalance = currentBalance + parseInt(amount);
            document.getElementById('cashBalance').textContent = 'Rp' + (newBalance / 1000).toFixed(0) + 'K';

            closeModal('depositModal');
            document.getElementById('depositAmount').value = '';
            document.getElementById('depositNote').value = '';

            showToast('Kas berhasil disetor!');
        }

        // Withdraw Function
        function saveWithdraw() {
            const amount = document.getElementById('withdrawAmount').value;
            if (!amount || amount <= 0) {
                showToast('Masukkan jumlah yang valid!', 'error');
                return;
            }

            const currentBalance = parseInt(document.getElementById('cashBalance').textContent.replace('Rp', '').replace('K', '000'));
            if (amount > currentBalance) {
                showToast('Saldo tidak cukup!', 'error');
                return;
            }

            const newBalance = currentBalance - parseInt(amount);
            document.getElementById('cashBalance').textContent = 'Rp' + (newBalance / 1000).toFixed(0) + 'K';

            closeModal('withdrawModal');
            document.getElementById('withdrawAmount').value = '';
            document.getElementById('withdrawNote').value = '';

            showToast('Kas berhasil ditarik!');
        }

        // Achievement Function
        function saveAchievement() {
            const name = document.getElementById('achievementName').value;
            if (!name) {
                showToast('Mohon isi nama prestasi!', 'error');
                return;
            }

            const achievementList = document.getElementById('achievementList');
            const newItem = document.createElement('li');
            newItem.className = 'text-sm sm:text-base font-medium hover:text-dark-yellow cursor-pointer transition hover:bg-creame px-3 py-1 rounded';
            newItem.textContent = name;
            achievementList.appendChild(newItem);

            closeModal('addAchievementModal');
            document.getElementById('achievementName').value = '';
            document.getElementById('achievementDate').value = '';
            document.getElementById('achievementDesc').value = '';

            showToast('Prestasi berhasil ditambahkan!');
        }

        // Mark Attendance
        document.getElementById('markAttendanceBtn').addEventListener('click', () => {
            const current = parseInt(document.getElementById('attendancePercent').textContent);
            const newPercent = Math.min(100, current + 5);
            document.getElementById('attendancePercent').textContent = newPercent + '%';
            document.getElementById('attendanceBar').style.width = newPercent + '%';
            showToast('Kehadiran telah ditandai!');
        });

        // Report Attendance
        document.getElementById('reportAttendanceBtn').addEventListener('click', () => {
            showToast('Laporan absensi dibuka di tab baru', 'success');
        });

        // Announcement Actions
        document.getElementById('shareAnnouncementBtn').addEventListener('click', () => {
            showToast('Pengumuman berhasil dibagikan!');
        });

        document.getElementById('viewApplicantsBtn').addEventListener('click', () => {
            showToast('Daftar pendaftar dibuka di tab baru', 'success');
        });

        document.getElementById('deleteAnnouncementBtn').addEventListener('click', () => {
            showToast('Pengumuman berhasil dihapus!');
        });

        document.getElementById('galleryBtn').addEventListener('click', () => {
            showToast('Galeri prestasi dibuka di tab baru', 'success');
        });

        document.getElementById('viewAllScheduleBtn').addEventListener('click', () => {
            showToast('Jadwal lengkap dibuka di tab baru', 'success');
        });

        document.getElementById('openScheduleBtn').addEventListener('click', () => {
            showToast('Jadwal minggu ini dibuka di tab baru', 'success');
        });

        document.getElementById('settingsBtn').addEventListener('click', () => {
            showToast('Pengaturan dibuka di halaman baru', 'success');
        });

        document.getElementById('editAnnouncementBtn').addEventListener('click', () => {
            showToast('Mode edit pengumuman dibuka', 'success');
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modals = ['addActivityModal', 'depositModal', 'withdrawModal', 'addAchievementModal', 'joinClubModal'];
            modals.forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (e.target === modal && !modal.classList.contains('hidden')) {
                    closeModal(modalId);
                }
            });
        });