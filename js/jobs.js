// БИРЖА ТРУДА
var jobsDB = null;
var currentJobId = null;
var currentRole = null;

function initJobsDB() {
  if (!window.firebase || !firebase.apps || !firebase.apps.length) {
    setTimeout(initJobsDB, 800); return;
  }
  try {
    jobsDB = firebase.database().ref('jobs');
    console.log('JobsDB ready');
  } catch(e) {
    setTimeout(initJobsDB, 800); return;
  }
}

// ── PUSH УВЕДОМЛЕНИЯ ──
function sendPushNotification(targetHuid, title, body) {
  if (!targetHuid || !window.firebase || !firebase.apps.length) return;
  try {
    var key = targetHuid.replace(/[^a-zA-Z0-9]/g, '');
    firebase.database().ref('notifications/' + key).push({
      title: title,
      body: body,
      read: false,
      time: Date.now()
    });
  } catch(e) {
    console.error('sendPushNotification error:', e);
  }
}

// ── РОЛЬ ──
function selectRole(role) {
  currentRole = role;
  el('jobs-role').style.display = 'none';
  if (role === 'employer') {
    el('jobs-employer').style.display = 'block';
    loadMyJobs();
  } else {
    el('jobs-worker').style.display = 'block';
    loadJobs();
  }
}

// ── КАТЕГОРИИ ──
var jobCategories = [
  { id:'it', icon:'💻', name:'IT и технологии' },
  { id:'build', icon:'🏗️', name:'Строительство' },
  { id:'transport', icon:'🚗', name:'Транспорт и доставка' },
  { id:'clean', icon:'🧹', name:'Уборка и клининг' },
  { id:'cook', icon:'🍳', name:'Кулинария' },
  { id:'teach', icon:'📚', name:'Образование' },
  { id:'med', icon:'🏥', name:'Медицина' },
  { id:'design', icon:'🎨', name:'Дизайн и творчество' },
  { id:'fin', icon:'💰', name:'Финансы и бухгалтерия' },
  { id:'other', icon:'🔧', name:'Другое' },
];

function renderCategories(targetId, onSelect) {
  var container = el(targetId);
  if (!container) return;
  container.innerHTML = jobCategories.map(function(c) {
    return '<div onclick="(' + onSelect + ')(\''+c.id+'\')" style="display:flex;align-items:center;gap:12px;padding:14px;background:white;border-radius:12px;margin-bottom:8px;cursor:pointer;border:1.5px solid var(--border);">'
      + '<span style="font-size:24px;">'+c.icon+'</span>'
      + '<span style="font-size:15px;font-weight:600;color:var(--text);">'+c.name+'</span>'
      + '</div>';
  }).join('');
}

// ── РАБОТОДАТЕЛЬ ──
var selectedCategory = '';

function showPostJob() {
  el('jobs-cat-select').style.display = 'block';
  el('jobs-employer-home').style.display = 'none';
  renderCategories('jobs-cat-list', 'selectJobCategory');
}

function selectJobCategory(catId) {
  selectedCategory = catId;
  var cat = jobCategories.find(function(c){ return c.id === catId; });
  el('jobs-cat-select').style.display = 'none';
  el('jobs-post-form').style.display = 'block';
  el('jobs-post-cat-label').innerText = cat ? cat.icon + ' ' + cat.name : catId;
}

function postNewJob() {
  var title = el('jp-title') ? el('jp-title').value.trim() : '';
  var desc = el('jp-desc') ? el('jp-desc').value.trim() : '';
  var price = el('jp-price') ? el('jp-price').value.trim() : '';
  var location = el('jp-location') ? el('jp-location').value.trim() : '';
  if (!title) { T('Введите название заказа'); return; }
  if (!desc) { T('Опишите задание'); return; }
  if (!price) { T('Укажите оплату'); return; }
  if (!U || !U.huid) { T('Ошибка авторизации'); return; }

  function publishJob(lat, lng) {
    safeFirebase(function() {
      var job = {
        id: Date.now().toString(36).toUpperCase(),
        title: title, desc: desc, price: price,
        location: location || 'Удалённо',
        category: selectedCategory,
        employer: U.name, employerHuid: U.huid,
        status: 'open', createdAt: Date.now(), applicants: {},
        lat: lat || null, lng: lng || null
      };
      firebase.database().ref('jobs/' + job.id).set(job).then(function() {
        T('✅ Заказ опубликован!');
        el('jobs-post-form').style.display = 'none';
        el('jobs-employer-home').style.display = 'block';
        loadMyJobs();
        clearPostForm();
      }).catch(function(e) {
        T('Ошибка публикации. Попробуйте снова.');
        console.error('postNewJob error:', e);
      });
    }, function() {
      T('Нет соединения с сервером');
    });
  }

  if (navigator.geolocation) {
    T('Определяем местоположение...');
    navigator.geolocation.getCurrentPosition(
      function(pos) { publishJob(pos.coords.latitude, pos.coords.longitude); },
      function() { publishJob(null, null); },
      { timeout: 5000 }
    );
  } else {
    publishJob(null, null);
  }
}

function clearPostForm() {
  ['jp-title','jp-desc','jp-price','jp-location'].forEach(function(id){
    var e = el(id); if (e) e.value = '';
  });
}

function loadMyJobs() {
  var list = el('my-jobs-list');
  if (!list) return;
  safeFirebase(function() {
    firebase.database().ref('jobs').orderByChild('employerHuid').equalTo(U.huid).on('value', function(snap) {
      var jobs = snap.val();
      if (!jobs) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);font-size:13px;">Нет активных заказов</div>';
        return;
      }
      list.innerHTML = Object.values(jobs).reverse().map(function(j) {
        var appCount = j.applicants ? Object.keys(j.applicants).length : 0;
        var statusColor = j.status==='open' ? 'var(--green)' : j.status==='done' ? '#059669' : '#EF4444';
        var statusBg = j.status==='open' ? 'var(--green-light)' : j.status==='done' ? '#D1FAE5' : '#FEE2E2';
        var statusText = j.status==='open' ? 'Открыт' : j.status==='done' ? 'Завершён' : 'Закрыт';
        return '<div class="job-item" onclick="openJobDetail(\''+j.id+'\')" style="cursor:pointer;">'
          + '<div class="job-company">' + (jobCategories.find(function(c){return c.id===j.category;})||{icon:'🔧'}).icon + ' ' + j.location + '</div>'
          + '<div class="job-title">' + j.title + '</div>'
          + '<div class="job-tags"><span class="job-tag">'+j.price+'</span><span class="job-tag" style="background:'+statusBg+';color:'+statusColor+'">'+statusText+'</span></div>'
          + '<div style="font-size:12px;color:var(--green);margin-top:6px;font-weight:600;">👥 Откликов: '+appCount+'</div>'
          + '</div>';
      }).join('');
    }, function(e) {
      console.error('loadMyJobs error:', e);
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);">Ошибка загрузки</div>';
    });
  });
}

// ── ТОКЕНЫ ──
function addToken(userHuid, type, amount) {
  if (!userHuid || !type || !amount) return;
  safeFirebase(function() {
    var key = userHuid.replace(/[^a-zA-Z0-9]/g,'');
    var ref = firebase.database().ref('tokens/' + key + '/' + type);
    ref.once('value', function(snap) {
      var cur = snap.val() || 0;
      ref.set(Math.round((cur + amount) * 100000) / 100000)
        .catch(function(e){ console.error('addToken error:', e); });
    }, function(e){ console.error('addToken read error:', e); });
  });
}

// ── ЗАВЕРШЕНИЕ — работодатель ──
function completeJobEmployer(jobId, workerHuid) {
  if (!jobId || !workerHuid) { T('Ошибка данных'); return; }
  safeFirebase(function() {
    firebase.database().ref('jobs/' + jobId + '/confirmedEmployer').set(true).then(function() {
      T('✅ Вы подтвердили завершение');
      closeJobDetail();
      firebase.database().ref('jobs/' + jobId).once('value', function(snap) {
        var j = snap.val(); if (!j) return;
        if (j.confirmedWorker) {
          firebase.database().ref('jobs/' + jobId + '/status').set('done');
          addToken(workerHuid, 'qrt', 1);
          addToken(U.huid, 'qrt', 0.1);
          T('🎉 Заказ завершён! Начислены QRT');
          if (typeof loadWorkersOnMap === 'function') loadWorkersOnMap();
          sendPushNotification(workerHuid, '🎉 Заказ завершён!', 'Начислен QRT! Оцените работодателя');
          setTimeout(function(){
            openRating(jobId, workerHuid, j.selectedWorkerName || 'Работник', 'employer');
          }, 800);
        } else {
          firebase.database().ref('jobs/' + jobId + '/confirmedWorker').on('value', function(s) {
            if (s.val() === true) {
              firebase.database().ref('jobs/' + jobId + '/confirmedWorker').off();
              firebase.database().ref('jobs/' + jobId).once('value', function(snap2) {
                var j2 = snap2.val(); if (!j2) return;
                firebase.database().ref('jobs/' + jobId + '/status').set('done');
                addToken(workerHuid, 'qrt', 1);
                addToken(U.huid, 'qrt', 0.1);
                T('🎉 Заказ завершён! Начислены QRT');
                if (typeof loadWorkersOnMap === 'function') loadWorkersOnMap();
                sendPushNotification(workerHuid, '🎉 Заказ завершён!', 'Начислен QRT токен!');
                setTimeout(function(){
                  openRating(jobId, workerHuid, j2.selectedWorkerName || 'Работник', 'employer');
                }, 800);
              });
            }
          });
        }
      });
    }).catch(function(e) {
      T('Ошибка подтверждения. Попробуйте снова.');
      console.error('completeJobEmployer error:', e);
    });
  }, function() { T('Нет соединения с сервером'); });
}

// ── ЗАВЕРШЕНИЕ — работник ──
function completeJobWorker(jobId, employerHuid) {
  if (!jobId || !employerHuid) { T('Ошибка данных'); return; }
  safeFirebase(function() {
    firebase.database().ref('jobs/' + jobId + '/confirmedWorker').set(true).then(function() {
      T('✅ Вы подтвердили завершение');
      closeJobDetail();
      firebase.database().ref('jobs/' + jobId).once('value', function(snap) {
        var j = snap.val(); if (!j) return;
        if (j.confirmedEmployer) {
          firebase.database().ref('jobs/' + jobId + '/status').set('done');
          addToken(U.huid, 'qrt', 1);
          addToken(employerHuid, 'qrt', 0.1);
          T('🎉 Заказ завершён! Начислены QRT');
          if (typeof loadWorkersOnMap === 'function') loadWorkersOnMap();
          sendPushNotification(employerHuid, '🎉 Заказ завершён!', 'Работник подтвердил выполнение. Оцените исполнителя!');
          setTimeout(function(){
            openRating(jobId, employerHuid, j.employer, 'worker');
          }, 800);
        } else {
          firebase.database().ref('jobs/' + jobId + '/confirmedEmployer').on('value', function(s) {
            if (s.val() === true) {
              firebase.database().ref('jobs/' + jobId + '/confirmedEmployer').off();
              firebase.database().ref('jobs/' + jobId).once('value', function(snap2) {
                var j2 = snap2.val(); if (!j2) return;
                firebase.database().ref('jobs/' + jobId + '/status').set('done');
                addToken(U.huid, 'qrt', 1);
                addToken(employerHuid, 'qrt', 0.1);
                T('🎉 Заказ завершён! Начислены QRT');
                if (typeof loadWorkersOnMap === 'function') loadWorkersOnMap();
                sendPushNotification(employerHuid, '🎉 Заказ завершён!', 'Работник подтвердил выполнение!');
                setTimeout(function(){
                  openRating(jobId, employerHuid, j2.employer, 'worker');
                }, 800);
              });
            }
          });
        }
      });
    }).catch(function(e) {
      T('Ошибка подтверждения. Попробуйте снова.');
      console.error('completeJobWorker error:', e);
    });
  }, function() { T('Нет соединения с сервером'); });
}

// ── РАБОТНИК ──
function loadJobs() {
  var list = el('worker-jobs-list');
  if (!list) return;
  safeFirebase(function() {
    firebase.database().ref('jobs').on('value', function(snap) {
      var jobs = snap.val();
      if (!jobs) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);font-size:13px;">Нет доступных заказов</div>';
        return;
      }
      var myKey = U.huid.replace(/[^a-zA-Z0-9]/g,'');
      var jobList = Object.values(jobs).filter(function(j) {
        var iApplied = j.applicants && j.applicants[myKey];
        return j.status === 'open' || iApplied || j.selectedWorker === U.huid;
      });
      list.innerHTML = jobList.reverse().map(function(j) {
        var alreadyApplied = j.applicants && j.applicants[myKey];
        var isSelected = j.selectedWorker === U.huid;
        var cat = jobCategories.find(function(c){return c.id===j.category;})||{icon:'🔧'};
        var btn = '';
        if (j.status === 'done') {
          btn = '<div style="margin-top:10px;font-size:13px;color:#059669;text-align:center;padding:8px;background:#D1FAE5;border-radius:8px;font-weight:600;">✅ Заказ завершён</div>';
        } else if (j.status === 'closed') {
          if (isSelected) {
            var confirmBtn = j.confirmedWorker
              ? '<span style="font-size:12px;color:#059669;font-weight:600;padding:8px;">⏳ Ждём работодателя...</span>'
              : '<button style="padding:8px 14px;background:#059669;color:white;border:none;border-radius:10px;font-size:13px;cursor:pointer;font-weight:600;" onclick="event.stopPropagation();completeJobWorker(\''+j.id+'\',\''+j.employerHuid+'\')">✅ Завершить</button>';
            btn = '<div style="margin-top:10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;">'
              + '<span style="font-size:13px;color:var(--green);font-weight:600;flex:1;">🎉 Вы выбраны!</span>'
              + '<button style="padding:8px 14px;background:var(--green);color:white;border:none;border-radius:10px;font-size:13px;cursor:pointer;" onclick="event.stopPropagation();openJobChat(\''+j.id+'\',\''+U.huid+'\',\''+j.employer+'\')">💬 Чат</button>'
              + confirmBtn
              + '</div>';
          } else if (alreadyApplied) {
            btn = '<div style="margin-top:10px;font-size:13px;color:#EF4444;text-align:center;padding:8px;background:#FEE2E2;border-radius:8px;">😔 Выбран другой исполнитель</div>';
          } else {
            btn = '<div style="margin-top:10px;font-size:13px;color:var(--text2);text-align:center;padding:8px;background:var(--bg);border-radius:8px;">🔒 Заказ закрыт</div>';
          }
        } else {
          if (alreadyApplied) {
            btn = '<div style="margin-top:10px;display:flex;gap:8px;align-items:center;">'
              + '<span style="font-size:13px;color:var(--green);font-weight:600;flex:1;">✅ Вы откликнулись</span>'
              + '<button style="padding:8px 14px;background:var(--green);color:white;border:none;border-radius:10px;font-size:13px;cursor:pointer;" onclick="event.stopPropagation();openJobChat(\''+j.id+'\',\''+U.huid+'\',\''+j.employer+'\')">💬 Чат</button>'
              + '</div>';
          } else {
            btn = '<button class="btn" style="margin-top:10px;padding:10px;font-size:13px;" onclick="event.stopPropagation();applyToJob(\''+j.id+'\',this)">Откликнуться</button>';
          }
        }
        return '<div class="job-item">'
          + '<div class="job-company">' + cat.icon + ' ' + j.employer + '</div>'
          + '<div class="job-title" onclick="openJobDetail(\''+j.id+'\')" style="cursor:pointer;">' + j.title + '</div>'
          + '<div style="font-size:13px;color:var(--text2);margin-bottom:8px;line-height:1.5;">' + j.desc.substring(0,80) + (j.desc.length>80?'...':'') + '</div>'
          + '<div class="job-tags"><span class="job-tag">'+j.price+'</span><span class="job-tag">'+j.location+'</span></div>'
          + btn
          + '</div>';
      }).join('');
    }, function(e) {
      console.error('loadJobs error:', e);
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);">Ошибка загрузки заказов</div>';
    });
  });
}

function applyToJob(jobId, btn) {
  if (!jobId) { T('Ошибка: заказ не найден'); return; }
  if (!U || !U.huid) { T('Ошибка авторизации'); return; }
  if (btn) btn.disabled = true;
  safeFirebase(function() {
    var key = U.huid.replace(/[^a-zA-Z0-9]/g,'');
    firebase.database().ref('jobs/' + jobId + '/applicants/' + key).set({
      name: U.name, huid: U.huid, appliedAt: Date.now(), status: 'pending'
    }).then(function() {
      T('✅ Отклик отправлен!');
      firebase.database().ref('jobs/' + jobId + '/employerHuid').once('value', function(snap) {
        var employerHuid = snap.val();
        if (employerHuid) {
          sendPushNotification(employerHuid, '👥 Новый отклик!', U.name + ' откликнулся на ваш заказ');
        }
      });
      loadJobs();
    }).catch(function(e) {
      T('Ошибка отклика. Попробуйте снова.');
      console.error('applyToJob error:', e);
      if (btn) btn.disabled = false;
    });
  }, function() {
    T('Нет соединения с сервером');
    if (btn) btn.disabled = false;
  });
}

// ── ДЕТАЛИ ЗАКАЗА ──
function openJobDetail(jobId) {
  if (!jobId) return;
  currentJobId = jobId;
  safeFirebase(function() {
    firebase.database().ref('jobs/' + jobId).once('value', function(snap) {
      var j = snap.val();
      if (!j) { T('Заказ не найден'); return; }
      var isEmployer = j.employerHuid === U.huid;
      var cat = jobCategories.find(function(c){return c.id===j.category;}) || {icon:'🔧',name:'Другое'};
      var alreadyApplied = j.applicants && j.applicants[U.huid.replace(/[^a-zA-Z0-9]/g,'')];
      el('job-detail').innerHTML =
        '<div class="pg-head" style="background:white;padding:16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border);">'
        + '<button class="pg-back" onclick="closeJobDetail()"><svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg></button>'
        + '<span style="font-size:17px;font-weight:700;">Детали заказа</span></div>'
        + '<div style="padding:16px;overflow-y:auto;flex:1;">'
        + '<div style="font-size:11px;color:var(--text2);margin-bottom:4px;">' + cat.icon + ' ' + cat.name + ' · ' + j.location + '</div>'
        + '<div style="font-size:20px;font-weight:900;color:var(--text);margin-bottom:8px;">' + j.title + '</div>'
        + '<div style="font-size:24px;font-weight:900;color:var(--green);margin-bottom:16px;">' + j.price + '</div>'
        + '<div class="card"><div class="section-title">Описание</div><div style="font-size:14px;color:var(--text);line-height:1.7;">' + j.desc + '</div></div>'
        + '<div class="card"><div class="section-title">Работодатель</div><div style="font-size:14px;font-weight:600;">' + j.employer + '</div></div>'
        + (isEmployer ? renderApplicants(j) :
            j.status === 'done' ? '<div style="text-align:center;padding:20px;font-size:14px;color:#059669;font-weight:600;">✅ Заказ завершён</div>' :
            alreadyApplied && j.selectedWorker === U.huid && j.status === 'closed' ? (!j.confirmedWorker
              ? '<button class="btn" style="background:#059669;" onclick="completeJobWorker(\''+j.id+'\',\''+j.employerHuid+'\')">✅ Подтвердить завершение</button>'
              : '<div style="text-align:center;padding:20px;font-size:14px;color:#059669;font-weight:600;">⏳ Ждём работодателя...</div>') :
            alreadyApplied ? '<div style="text-align:center;padding:20px;font-size:15px;font-weight:700;color:var(--green);">✅ Вы уже откликнулись</div>' :
            j.status === 'closed' ? '<div style="text-align:center;padding:20px;font-size:14px;color:var(--text2);">🔒 Заказ закрыт</div>' :
            '<button class="btn" onclick="applyToJob(\''+j.id+'\',this)">Откликнуться</button>')
        + '</div>';
      el('job-detail').style.display = 'flex';
    }, function(e) {
      T('Ошибка загрузки заказа');
      console.error('openJobDetail error:', e);
    });
  });
}

function renderApplicants(j) {
  if (!j.applicants || Object.keys(j.applicants).length === 0) {
    return '<div class="card"><div class="section-title">Отклики</div><div style="text-align:center;padding:16px;color:var(--text2);font-size:13px;">Откликов пока нет</div></div>';
  }
  var apps = Object.values(j.applicants);
  return '<div class="card"><div class="section-title">Отклики (' + apps.length + ')</div>'
    + apps.map(function(a) {
      var isSelected = j.selectedWorker === a.huid;
      var actionBtn = '';
      if (j.status === 'done') {
        actionBtn = '<span style="font-size:12px;color:#059669;font-weight:700;padding:6px;">✅ Завершён</span>';
      } else if (j.status === 'closed' && isSelected) {
        actionBtn = j.confirmedEmployer
          ? '<span style="font-size:12px;color:#059669;font-weight:600;padding:6px;">⏳ Ждём работника...</span>'
          : '<button style="padding:6px 14px;background:#059669;color:white;border:none;border-radius:8px;font-size:12px;cursor:pointer;font-weight:600;" onclick="completeJobEmployer(\''+j.id+'\',\''+a.huid+'\')">✅ Завершить</button>';
      } else if (j.status === 'open') {
        actionBtn = '<button style="padding:6px 14px;background:var(--green);color:white;border:none;border-radius:8px;font-size:12px;cursor:pointer;font-weight:600;" onclick="selectApplicant(\''+j.id+'\',\''+a.huid+'\')">✓ Выбрать</button>';
      }
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">'
        + '<div><div style="font-size:14px;font-weight:600;">' + a.name + (isSelected ? ' ✅' : '') + '</div>'
        + '<div style="font-size:11px;color:var(--text2);">' + a.huid + '</div></div>'
        + '<div style="display:flex;gap:8px;align-items:center;">'
        + actionBtn
        + '<button style="padding:6px 14px;background:var(--bg);color:var(--text);border:1px solid var(--border);border-radius:8px;font-size:12px;cursor:pointer;font-weight:600;" onclick="openJobChat(\''+j.id+'\',\''+a.huid+'\',\''+a.name+'\')">💬 Чат</button>'
        + '</div></div>';
    }).join('')
    + '</div>';
}

function selectApplicant(jobId, workerHuid) {
  if (!jobId || !workerHuid) { T('Ошибка данных'); return; }
  safeFirebase(function() {
    firebase.database().ref('jobs/' + jobId + '/status').set('closed');
    firebase.database().ref('jobs/' + jobId + '/selectedWorker').set(workerHuid);
    firebase.database().ref('jobs/' + jobId + '/applicants').once('value', function(snap) {
      var apps = snap.val();
      if (apps) {
        Object.values(apps).forEach(function(a) {
          if (a.huid === workerHuid) {
            firebase.database().ref('jobs/' + jobId + '/selectedWorkerName').set(a.name);
          }
        });
      }
    });
    sendPushNotification(workerHuid, '🎉 Вас выбрали!', 'Работодатель выбрал вас исполнителем заказа');
    T('✅ Работник выбран!');
    closeJobDetail();
  }, function() { T('Нет соединения с сервером'); });
}

function closeJobDetail() {
  el('job-detail').style.display = 'none';
}

// ── ЧАТ ──
var chatRef = null;
var chatJobId = null;
var chatWorkerHuid = null;

function openJobChat(jobId, workerHuid, workerName) {
  if (chatRef) { chatRef.off(); chatRef = null; }
  chatJobId = jobId;
  chatWorkerHuid = workerHuid;
  var chatTitle = el('job-chat-title');
  if (chatTitle) chatTitle.innerText = workerName || 'Чат';
  el('job-chat-msgs').innerHTML = '';
  el('job-chat').style.display = 'flex';
  var chatKey = (jobId + '_' + workerHuid).replace(/[^a-zA-Z0-9]/g,'').substring(0,60);
  if (!window.firebase || !firebase.apps.length) { T('Нет соединения'); return; }
  chatRef = firebase.database().ref('job_chats/' + chatKey);
  chatRef.on('child_added', function(snap) {
    var msg = snap.val();
    if (!msg) return;
    var msgs = el('job-chat-msgs');
    var isMe = msg.senderHuid === U.huid;
    var d = document.createElement('div');
    d.className = 'msg ' + (isMe ? 'user' : 'bot');
    d.innerHTML = '<div style="font-size:10px;opacity:0.7;margin-bottom:2px;">' + (isMe ? 'Вы' : (msg.senderName || '')) + '</div>' + msg.text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  });
}

function sendJobChatMsg() {
  var inp = el('job-chat-inp');
  if (!inp || !inp.value.trim()) return;
  if (inp.value.trim().length > 500) { T('Максимум 500 символов'); return; }
  var text = inp.value.trim();
  inp.value = '';
  if (!chatRef) { T('Нет соединения'); return; }
  safeFirebase(function() {
    chatRef.push({
      text: text, senderName: U.name, senderHuid: U.huid, time: Date.now()
    }).then(function() {
      if (chatWorkerHuid && chatWorkerHuid !== U.huid) {
        sendPushNotification(chatWorkerHuid, '💬 ' + U.name, text.substring(0, 60));
      }
    }).catch(function(e){ console.error('sendJobChatMsg error:', e); });
  });
}

function closeJobChat() {
  if (chatRef) { chatRef.off(); chatRef = null; }
  el('job-chat').style.display = 'none';
}

// ── РЕЙТИНГ ──
function openRating(jobId, targetHuid, targetName, targetRole) {
  el('rating-title').innerText = 'Оценить: ' + targetName;
  el('rating-job-id').value = jobId;
  el('rating-target').value = targetHuid;
  el('rating-target-role').value = targetRole || '';
  el('rating-panel').style.display = 'flex';
  renderStars(0);
}

var selectedRating = 0;
function renderStars(n) {
  selectedRating = n;
  var s = el('rating-stars');
  if (!s) return;
  s.innerHTML = [1,2,3,4,5].map(function(i) {
    return '<span onclick="renderStars('+i+')" style="font-size:36px;cursor:pointer;">' + (i<=n?'⭐':'☆') + '</span>';
  }).join('');
}

function submitRating() {
  if (!selectedRating) { T('Поставьте оценку'); return; }
  var jobId = el('rating-job-id').value;
  var targetHuid = el('rating-target').value;
  var targetRole = el('rating-target-role') ? el('rating-target-role').value : '';
  var review = el('rating-review') ? el('rating-review').value.trim() : '';
  if (!targetHuid) { T('Ошибка данных'); return; }
  var key = targetHuid.replace(/[^a-zA-Z0-9]/g,'');
  safeFirebase(function() {
    firebase.database().ref('ratings/' + key).push({
      rating: selectedRating, review: review,
      from: U.name, fromHuid: U.huid,
      jobId: jobId, time: Date.now()
    }).then(function() {
      if (targetRole === 'worker') {
        if (selectedRating === 5) {
          addToken(targetHuid, 'qrt', 3);
          addToken(targetHuid, 'qrnc', 0.5);
          T('⭐ Оценка отправлена! +3 QRT +0.5 QRNC');
          sendPushNotification(targetHuid, '⭐ 5 звёзд!', U.name + ' поставил вам 5★ +3 QRT +0.5 QRNC');
        } else if (selectedRating === 4) {
          addToken(targetHuid, 'qrt', 2);
          addToken(targetHuid, 'qrnc', 0.2);
          T('⭐ Оценка отправлена! +2 QRT +0.2 QRNC');
          sendPushNotification(targetHuid, '⭐ 4 звезды!', U.name + ' поставил вам 4★ +2 QRT +0.2 QRNC');
        } else if (selectedRating === 3) {
          addToken(targetHuid, 'qrt', 1);
          addToken(targetHuid, 'qrnc', 0.1);
          T('⭐ Оценка отправлена! +1 QRT +0.1 QRNC');
          sendPushNotification(targetHuid, '⭐ Новый отзыв', U.name + ' оценил вашу работу на 3★');
        } else {
          T('⭐ Оценка отправлена!');
          sendPushNotification(targetHuid, '⭐ Новый отзыв', U.name + ' оставил вам отзыв');
        }
      } else {
        T('⭐ Оценка отправлена!');
        sendPushNotification(targetHuid, '⭐ Новый отзыв', U.name + ' оценил вас как работодателя');
      }
      el('rating-panel').style.display = 'none';
    }).catch(function(e) {
      T('Ошибка отправки оценки');
      console.error('submitRating error:', e);
    });
  }, function() { T('Нет соединения с сервером'); });
}

function closeRating() { el('rating-panel').style.display = 'none'; }

// ── ФИЛЬТР ──
function filterJobs(catId) {
  var list = el('worker-jobs-list');
  if (!list) return;
  safeFirebase(function() {
    firebase.database().ref('jobs').on('value', function(snap) {
      var jobs = snap.val();
      if (!jobs) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);">Нет заказов</div>';
        return;
      }
      var myKey = U.huid.replace(/[^a-zA-Z0-9]/g,'');
      var filtered = Object.values(jobs).filter(function(j){
        var iApplied = j.applicants && j.applicants[myKey];
        var visible = j.status === 'open' || iApplied || j.selectedWorker === U.huid;
        return visible && (!catId || j.category === catId);
      });
      if (!filtered.length) {
        list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);">Нет заказов в этой категории</div>';
        return;
      }
      list.innerHTML = filtered.reverse().map(function(j) {
        var cat = jobCategories.find(function(c){return c.id===j.category;})||{icon:'🔧'};
        return '<div class="job-item" onclick="openJobDetail(\''+j.id+'\')" style="cursor:pointer;">'
          + '<div class="job-company">' + cat.icon + ' ' + j.employer + '</div>'
          + '<div class="job-title">' + j.title + '</div>'
          + '<div style="font-size:13px;color:var(--text2);margin-bottom:8px;">' + j.desc.substring(0,80) + '...</div>'
          + '<div class="job-tags"><span class="job-tag">'+j.price+'</span><span class="job-tag">'+j.location+'</span></div>'
          + '</div>';
      }).join('');
    }, function(e) {
      console.error('filterJobs error:', e);
      list.innerHTML = '<div style="text-align:center;padding:20px;color:var(--text2);">Ошибка загрузки</div>';
    });
  });
}
