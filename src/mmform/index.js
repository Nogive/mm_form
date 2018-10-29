import Vue from "vue";
import vueNcform from "@ncform/ncform";
import ncformCommon from "@ncform/ncform-common";

import mmInput from "./components/mmInput";
import mmNumber from "./components/mmNumber";
import mmTextarea from "./components/mmTextarea";
import mmRadio from "./components/mmRadio";
import mmSelect from "./components/mmSelect";
import mmDatePicker from "./components/mmDatePicker";
import mmPhoto from "./components/mmPhoto";
import mmLocation from "./components/mmLocation";
import mmObject from "./components/mmObject";
import mmArray from "./components/mmArray";
import mmArea from "./components/mmArea";

// 扩展的规则只需继续ValidationRule，实现validateLogic逻辑即可
class MyCustomRule extends ncformCommon.ValidationRule {
  constructor(props) {
    console.log(props);
    super(props);
    this.name = "myCustom";
    this.defaultErrMsg = "yeah, show my custom rule message";
  }
  validateLogic(val, ruleVal) {
    this.errMsg = "dynamic error";
    return val === "daniel";
  }
}

Vue.use(vueNcform, {
  extComponents: {
    mmInput,
    mmNumber,
    mmTextarea,
    mmRadio,
    mmSelect,
    mmDatePicker,
    mmPhoto,
    mmLocation,
    mmObject,
    mmArray,
    mmArea
  },
  extRules: [{ myCustom: MyCustomRule }]
});

//set readonly
function recursiveReadOnly(schema, readonly) {
  for (var o in schema) {
    let childFiled = schema[o];
    if (childFiled.layoutType == "array") {
      childFiled.ui.readonly = readonly;
      let arraySchema = childFiled.items.properties;
      recursiveReadOnly(arraySchema, readonly);
    } else if (childFiled.layoutType == "object") {
      let objectSchema = childFiled.properties;
      recursiveReadOnly(objectSchema, readonly);
    } else {
      childFiled.ui.readonly = readonly;
    }
  }
}
Vue.prototype.recursiveReadOnly = recursiveReadOnly;
