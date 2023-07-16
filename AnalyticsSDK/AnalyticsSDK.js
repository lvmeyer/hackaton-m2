
class AnalyticsSDK {
  static initDefaultSettings() {
    let allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    if (!allItems) {
      allItems = {
        [kAnalyticsUmeng]: { [kIsEnable]: false },
        [kAnalyticsGoogle]: { [kIsEnable]: false },
        [kAnalyticsAVOS]: { [kIsEnable]: false },
      };
      localStorage.setItem(kAnalyticsUD, JSON.stringify(allItems));
    }
  }

  static enableUmeng() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    allItems[kAnalyticsUmeng][kIsEnable] = true;
    localStorage.setItem(kAnalyticsUD, JSON.stringify(allItems));
  }

  static enableGoogle() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    allItems[kAnalyticsGoogle][kIsEnable] = true;
    localStorage.setItem(kAnalyticsUD, JSON.stringify(allItems));
  }

  static enableAVOS() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    allItems[kAnalyticsAVOS][kIsEnable] = true;
    localStorage.setItem(kAnalyticsUD, JSON.stringify(allItems));
  }

  static isEnableUmeng() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    return allItems[kAnalyticsUmeng][kIsEnable];
  }

  static isEnableGoogle() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    return allItems[kAnalyticsGoogle][kIsEnable];
  }

  static isEnableAVOS() {
    this.initDefaultSettings();
    const allItems = JSON.parse(localStorage.getItem(kAnalyticsUD));
    return allItems[kAnalyticsAVOS][kIsEnable];
  }


  static connectUmengWithAppKey(appKey, reportPolicy = AS_BATCH, channelID = "App Store") {
    this.enableUmeng();
  }

  static connectGoogleWithTrackingID(trackingID, dispatchInterval = kDefaultDispatchTimeInterval, channelId = "App Store") {
    this.enableGoogle();
  }

  static connectAvosWithApplicationIdAndClientKey(applicationId, key) {
    this.enableAVOS();
  }

  
  static setLogEnabled(isEnable) {
    if (this.isEnableUmeng()) {
   }

    if (this.isEnableGoogle()) {
      if (isEnable) {
      } else {
      }
    }

    if (this.isEnableAVOS()) {
    }
  }

  static beginLogView(viewName) {
    if (this.isEnableUmeng()) {
    }

    if (this.isEnableGoogle()) {
    }

    if (this.isEnableAVOS()) {
    }
  }

  static endLogView(viewName) {
    if (this.isEnableUmeng()) {
    }

    if (this.isEnableGoogle()) {
    }

    if (this.isEnableAVOS()) {
    }
  }

  /*
   events
   */

  static eventWithAction(action) {
    this.eventWithCategory("", action);
  }

  static eventWithCategory(category, action) {
    this.eventWithCategoryLabel(category, action, "");
  }

  static eventWithCategoryLabel(category, action, label) {
    this.eventWithCategoryLabelValue(category, action, label, null);
  }

  static eventWithCategoryLabelValue(category, action, label, value) {
    if (this.isEnableUmeng()) {
    }

    if (this.isEnableGoogle()) {
    }

    if (this.isEnableAVOS()) {
    }
  }

  static eventWithCategoryLabelAndTime(category, action, label, intervalMillis) {
    if (this.isEnableUmeng()) {
    }

    if (this.isEnableGoogle()) {
    }

    if (this.isEnableAVOS()) {
    }
  }
}

export default AnalyticsSDK;
