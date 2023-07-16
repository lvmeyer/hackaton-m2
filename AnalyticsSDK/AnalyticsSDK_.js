

const kDefaultChannel = "App Store";
const kDefaultDispatchTimeInterval = 20.0;

const AS_REALTIME = 0;       
const AS_BATCH = 1;          
const AS_SENDDAILY = 4;      
const AS_SENDWIFIONLY = 5;   
const AS_SEND_INTERVAL = 6;  
const AS_SEND_ON_EXIT = 7;   

class AnalyticsSDK {

  static connectUmengWithAppKey(appKey, reportPolicy = AS_BATCH, channelID = kDefaultChannel) {
  }

  static connectGoogleWithTrackingID(trackingID, dispatchInterval = kDefaultDispatchTimeInterval, channelId = kDefaultChannel) {
  }

  static connectAvosWithApplicationIdAndClientKey(applicationId, key) {
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

  /*
  basic page view
  */

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
