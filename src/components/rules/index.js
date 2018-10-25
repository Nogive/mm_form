import ncformCommon from "@ncform/ncform-common";

class radioRule extends ncformCommon.ValidationRule {
  constructor(props) {
    super(props);
    this.name = "myCustom"; // your rule name
    this.defaultErrMsg = "value must be true!"; // you rule default error message tips
  }

  validateLogic(val, ruleVal) {
    return val == ruleVal;
  }
}
export { radioRule };
