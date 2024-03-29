storageEngine = function() {
  var database;
  var objectStores;
  
  return {
    init:function(successCallback, errorCallback) {
      if (window.indexedDB) {
        var request = indexedDB.open(window.location.hostname+'DB', 1)
        request.onsuccess = function(event) {
        database = request.result;
        successCallback(null);
      }
      request.onerror = function(event) {
        errorCallback('storage_not_initialized', 'It is not possible to initialize storage');
      }
      } else {
        errorCallback('storage_api_not_supported', 'The web storage api is not supported');
      }
    },
    initObjectStore:function(type, successCallback, errorCallback) {
      if (!database) {
        errorCallback('storage_api_not_initialized', 'The storage engine has not been initialized');
      }
      var exists = false;
      $.each(database.objectStoreNames, function(i,v) {
        if (v == type) {
          exists = true;
        }
      });
      if (exists) {
        successCallback(null);
      } else {
        var version = database.version+1;
        database.close();
        var request = indexedDB.open(window.location.hostname+'DB', version);
        request.onsuccess = function(event) {
          successCallback(null);
        }
        request.onerror = function(event) {
          errorCallback('storage_not_initialized', 'It is not possible to initialize storage');
        }
        request.onupgradeneeded = function(event) {
          database = event.target.result;
          var objectStore = database.createObjectStore(type, {keyPath:'id', autoIncrement:true});
        }
      }
    },
    save:function(type, obj, successCallback, errorCallback) {
      
    },
    findAll:function(type, successCallback, errorCallback) {
      
    },
    delete:function(type, id, successCallback, errorCallback) {
      
    },
    findByProperty:function(type, propertyName, propertyValue, successCallback, errorCallback) {
      
    },
    findById:function(type, id, successCallback, errorCallback) {
      
    }
  }
}();