import Vue from "vue";
import vueNcform from "@ncform/ncform";
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
function recusiveReadOnly(schema, readonly) {
  for (var o in schema) {
    let childFiled = schema[o];
    if (childFiled.layoutType == "array") {
      childFiled.ui.readonly = readonly;
      let arraySchema = childFiled.items.properties;
      recusiveReadOnly(arraySchema, readonly);
    } else if (childFiled.layoutType == "object") {
      let objectSchema = childFiled.properties;
      recusiveReadOnly(objectSchema, readonly);
    } else {
      childFiled.ui.readonly = readonly;
    }
  }
}
Vue.prototype.recusiveReadOnly = recusiveReadOnly;
