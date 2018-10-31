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
  }
});

//set readonly
function recursiveReadOnly(schema, readonly) {
  for (var o in schema) {
    let childFiled = schema[o];
    if (childFiled.ui.widget == "mm-array") {
      childFiled.ui.readonly = readonly;
      let arraySchema = childFiled.items.properties;
      recursiveReadOnly(arraySchema, readonly);
    } else if (childFiled.ui.widget == "mm-object") {
      let objectSchema = childFiled.properties;
      recursiveReadOnly(objectSchema, readonly);
    } else {
      childFiled.ui.readonly = readonly;
    }
  }
}
Vue.prototype.recursiveReadOnly = recursiveReadOnly;
