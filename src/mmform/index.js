import Vue from "vue";
import vueNcform from "@ncform/ncform";
import mmInput from "./components/mmInput";
import mmNumber from "./components/mmNumber";
import mmTextarea from "./components/mmTextarea";
import mmRadio from "./components/mmRadio";
import mmCheckbox from "./components/mmCheckbox";
import mmSelect from "./components/mmSelect";
import mmDatePicker from "./components/mmDatePicker";
import mmTimePicker from "./components/mmTimePicker";
import mmPullSelect from "./components/mmPullSelect";
import mmMulSelect from "./components/mmMulSelect";
import mmPhoto from "./components/mmPhoto";
import mmLocation from "./components/mmLocation";
import mmObject from "./components/mmObject";
Vue.use(vueNcform, {
  extComponents: {
    mmInput,
    mmNumber,
    mmTextarea,
    mmRadio,
    mmCheckbox,
    mmSelect,
    mmDatePicker,
    mmTimePicker,
    mmPullSelect,
    mmMulSelect,
    mmPhoto,
    mmLocation,
    mmObject
  }
});
