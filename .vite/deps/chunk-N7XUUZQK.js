import {
  Icon,
  ariaAttr,
  callAll,
  callAllHandlers,
  chakra,
  compact,
  cx,
  dataAttr,
  forwardRef,
  getToken,
  isObject,
  keyframes,
  omitThemingProps,
  require_jsx_runtime,
  tokenToCSSVar,
  useMultiStyleConfig,
  useSafeLayoutEffect,
  useStyleConfig,
  useTheme
} from "./chunk-MYSK4KJE.js";
import {
  require_react
} from "./chunk-FLAVOKRJ.js";
import {
  __toESM
} from "./chunk-AC2VUBZ6.js";

// node_modules/@chakra-ui/image/dist/chunk-HR33I6FK.mjs
var import_react = __toESM(require_react(), 1);
function useImage(props) {
  const {
    loading,
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback
  } = props;
  const [status, setStatus] = (0, import_react.useState)("pending");
  (0, import_react.useEffect)(() => {
    setStatus(src ? "loading" : "pending");
  }, [src]);
  const imageRef = (0, import_react.useRef)();
  const load = (0, import_react.useCallback)(() => {
    if (!src)
      return;
    flush();
    const img = new Image();
    img.src = src;
    if (crossOrigin)
      img.crossOrigin = crossOrigin;
    if (srcSet)
      img.srcset = srcSet;
    if (sizes)
      img.sizes = sizes;
    if (loading)
      img.loading = loading;
    img.onload = (event) => {
      flush();
      setStatus("loaded");
      onLoad == null ? void 0 : onLoad(event);
    };
    img.onerror = (error) => {
      flush();
      setStatus("failed");
      onError == null ? void 0 : onError(error);
    };
    imageRef.current = img;
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError, loading]);
  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };
  useSafeLayoutEffect(() => {
    if (ignoreFallback)
      return void 0;
    if (status === "loading") {
      load();
    }
    return () => {
      flush();
    };
  }, [status, load, ignoreFallback]);
  return ignoreFallback ? "loaded" : status;
}
var shouldShowFallbackImage = (status, fallbackStrategy) => status !== "loaded" && fallbackStrategy === "beforeLoadOrError" || status === "failed" && fallbackStrategy === "onError";

// node_modules/@chakra-ui/image/dist/chunk-QBIO4VEB.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var NativeImage = forwardRef(function NativeImage2(props, ref) {
  const { htmlWidth, htmlHeight, alt, ...rest } = props;
  return (0, import_jsx_runtime.jsx)("img", { width: htmlWidth, height: htmlHeight, ref, alt, ...rest });
});
NativeImage.displayName = "NativeImage";

// node_modules/@chakra-ui/image/dist/chunk-E77276RR.mjs
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function omit(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
var Image2 = forwardRef(function Image22(props, ref) {
  const {
    fallbackSrc,
    fallback,
    src,
    srcSet,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin,
    fallbackStrategy = "beforeLoadOrError",
    referrerPolicy,
    ...rest
  } = props;
  const providedFallback = fallbackSrc !== void 0 || fallback !== void 0;
  const shouldIgnoreFallbackImage = loading != null || ignoreFallback || !providedFallback;
  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnoreFallbackImage
  });
  const showFallbackImage = shouldShowFallbackImage(status, fallbackStrategy);
  const shared = {
    ref,
    objectFit: fit,
    objectPosition: align,
    ...shouldIgnoreFallbackImage ? rest : omit(rest, ["onError", "onLoad"])
  };
  if (showFallbackImage) {
    if (fallback)
      return fallback;
    return (0, import_jsx_runtime2.jsx)(
      chakra.img,
      {
        as: NativeImage,
        className: "chakra-image__placeholder",
        src: fallbackSrc,
        ...shared
      }
    );
  }
  return (0, import_jsx_runtime2.jsx)(
    chakra.img,
    {
      as: NativeImage,
      src,
      srcSet,
      crossOrigin,
      loading,
      referrerPolicy,
      className: "chakra-image",
      ...shared
    }
  );
});
Image2.displayName = "Image";

// node_modules/@chakra-ui/image/dist/chunk-E3YVMML4.mjs
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var Img = forwardRef((props, ref) => (0, import_jsx_runtime3.jsx)(chakra.img, { ref, as: NativeImage, className: "chakra-image", ...props }));

// node_modules/@chakra-ui/react-use-callback-ref/dist/index.mjs
var import_react2 = __toESM(require_react(), 1);
function useCallbackRef(callback, deps = []) {
  const callbackRef = (0, import_react2.useRef)(callback);
  (0, import_react2.useEffect)(() => {
    callbackRef.current = callback;
  });
  return (0, import_react2.useCallback)((...args) => {
    var _a;
    return (_a = callbackRef.current) == null ? void 0 : _a.call(callbackRef, ...args);
  }, deps);
}

// node_modules/@chakra-ui/react-use-controllable-state/dist/index.mjs
var import_react3 = __toESM(require_react(), 1);
function useControllableState(props) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    shouldUpdate = (prev, next) => prev !== next
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const shouldUpdateProp = useCallbackRef(shouldUpdate);
  const [uncontrolledState, setUncontrolledState] = (0, import_react3.useState)(defaultValue);
  const controlled = valueProp !== void 0;
  const value = controlled ? valueProp : uncontrolledState;
  const setValue = useCallbackRef(
    (next) => {
      const setter = next;
      const nextValue = typeof next === "function" ? setter(value) : next;
      if (!shouldUpdateProp(value, nextValue)) {
        return;
      }
      if (!controlled) {
        setUncontrolledState(nextValue);
      }
      onChangeProp(nextValue);
    },
    [controlled, onChangeProp, value, shouldUpdateProp]
  );
  return [value, setValue];
}

// node_modules/@chakra-ui/checkbox/dist/chunk-5F7ST2TT.mjs
var import_react4 = __toESM(require_react(), 1);
function isInputEvent(value) {
  return value && isObject(value) && isObject(value.target);
}
function useCheckboxGroup(props = {}) {
  const {
    defaultValue,
    value: valueProp,
    onChange,
    isDisabled,
    isNative
  } = props;
  const onChangeProp = useCallbackRef(onChange);
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue: defaultValue || [],
    onChange: onChangeProp
  });
  const handleChange = (0, import_react4.useCallback)(
    (eventOrValue) => {
      if (!value)
        return;
      const isChecked = isInputEvent(eventOrValue) ? eventOrValue.target.checked : !value.includes(eventOrValue);
      const selectedValue = isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue;
      const nextValue = isChecked ? [...value, selectedValue] : value.filter((v) => String(v) !== String(selectedValue));
      setValue(nextValue);
    },
    [setValue, value]
  );
  const getCheckboxProps = (0, import_react4.useCallback)(
    (props2 = {}) => {
      const checkedKey = isNative ? "checked" : "isChecked";
      return {
        ...props2,
        [checkedKey]: value.some((val) => String(props2.value) === String(val)),
        onChange: handleChange
      };
    },
    [handleChange, isNative, value]
  );
  return {
    value,
    isDisabled,
    onChange: handleChange,
    setValue,
    getCheckboxProps
  };
}

// node_modules/@chakra-ui/react-context/dist/index.mjs
var import_react5 = __toESM(require_react(), 1);
function getErrorMessage(hook, provider) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
function createContext(options = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue
  } = options;
  const Context = (0, import_react5.createContext)(defaultValue);
  Context.displayName = name;
  function useContext() {
    var _a;
    const context = (0, import_react5.useContext)(Context);
    if (!context && strict) {
      const error = new Error(
        errorMessage != null ? errorMessage : getErrorMessage(hookName, providerName)
      );
      error.name = "ContextError";
      (_a = Error.captureStackTrace) == null ? void 0 : _a.call(Error, error, useContext);
      throw error;
    }
    return context;
  }
  return [Context.Provider, useContext, Context];
}

// node_modules/@chakra-ui/checkbox/dist/chunk-6XFPBTDN.mjs
var [CheckboxGroupProvider, useCheckboxGroupContext] = createContext({
  name: "CheckboxGroupContext",
  strict: false
});

// node_modules/@chakra-ui/checkbox/dist/chunk-Y65KPFRX.mjs
var import_react6 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function CheckboxGroup(props) {
  const { colorScheme, size, variant, children, isDisabled } = props;
  const { value, onChange } = useCheckboxGroup(props);
  const group = (0, import_react6.useMemo)(
    () => ({
      size,
      onChange,
      colorScheme,
      value,
      variant,
      isDisabled
    }),
    [size, onChange, colorScheme, value, variant, isDisabled]
  );
  return (0, import_jsx_runtime4.jsx)(CheckboxGroupProvider, { value: group, children });
}
CheckboxGroup.displayName = "CheckboxGroup";

// node_modules/@chakra-ui/checkbox/dist/chunk-DFEUIRKX.mjs
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function CheckIcon(props) {
  return (0, import_jsx_runtime5.jsx)(
    chakra.svg,
    {
      width: "1.2em",
      viewBox: "0 0 12 10",
      style: {
        fill: "none",
        strokeWidth: 2,
        stroke: "currentColor",
        strokeDasharray: 16
      },
      ...props,
      children: (0, import_jsx_runtime5.jsx)("polyline", { points: "1.5 6 4.5 9 10.5 1" })
    }
  );
}
function IndeterminateIcon(props) {
  return (0, import_jsx_runtime5.jsx)(
    chakra.svg,
    {
      width: "1.2em",
      viewBox: "0 0 24 24",
      style: { stroke: "currentColor", strokeWidth: 4 },
      ...props,
      children: (0, import_jsx_runtime5.jsx)("line", { x1: "21", x2: "3", y1: "12", y2: "12" })
    }
  );
}
function CheckboxIcon(props) {
  const { isIndeterminate, isChecked, ...rest } = props;
  const BaseIcon = isIndeterminate ? IndeterminateIcon : CheckIcon;
  return isChecked || isIndeterminate ? (0, import_jsx_runtime5.jsx)(
    chakra.div,
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
      },
      children: (0, import_jsx_runtime5.jsx)(BaseIcon, { ...rest })
    }
  ) : null;
}

// node_modules/@chakra-ui/react-use-merge-refs/dist/index.mjs
var import_react7 = __toESM(require_react(), 1);
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  try {
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
}
function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((ref) => {
      assignRef(ref, node);
    });
  };
}
function useMergeRefs(...refs) {
  return (0, import_react7.useMemo)(() => mergeRefs(...refs), refs);
}

// node_modules/@chakra-ui/form-control/dist/chunk-6ZNYZUDD.mjs
var import_react8 = __toESM(require_react(), 1);
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
var [FormControlStylesProvider, useFormControlStyles] = createContext({
  name: `FormControlStylesContext`,
  errorMessage: `useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormControl />" `
});
var [FormControlProvider, useFormControlContext] = createContext({
  strict: false,
  name: "FormControlContext"
});
function useFormControlProvider(props) {
  const {
    id: idProp,
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
    ...htmlProps
  } = props;
  const uuid = (0, import_react8.useId)();
  const id = idProp || `field-${uuid}`;
  const labelId = `${id}-label`;
  const feedbackId = `${id}-feedback`;
  const helpTextId = `${id}-helptext`;
  const [hasFeedbackText, setHasFeedbackText] = (0, import_react8.useState)(false);
  const [hasHelpText, setHasHelpText] = (0, import_react8.useState)(false);
  const [isFocused, setFocus] = (0, import_react8.useState)(false);
  const getHelpTextProps = (0, import_react8.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props2,
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setHasHelpText(true);
      })
    }),
    [helpTextId]
  );
  const getLabelProps = (0, import_react8.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      "data-focus": dataAttr(isFocused),
      "data-disabled": dataAttr(isDisabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(isReadOnly),
      id: props2.id !== void 0 ? props2.id : labelId,
      htmlFor: props2.htmlFor !== void 0 ? props2.htmlFor : id
    }),
    [id, isDisabled, isFocused, isInvalid, isReadOnly, labelId]
  );
  const getErrorMessageProps = (0, import_react8.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props2,
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite"
    }),
    [feedbackId]
  );
  const getRootProps = (0, import_react8.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ...htmlProps,
      ref: forwardedRef,
      role: "group"
    }),
    [htmlProps]
  );
  const getRequiredIndicatorProps = (0, import_react8.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      role: "presentation",
      "aria-hidden": true,
      children: props2.children || "*"
    }),
    []
  );
  return {
    isRequired: !!isRequired,
    isInvalid: !!isInvalid,
    isReadOnly: !!isReadOnly,
    isDisabled: !!isDisabled,
    isFocused: !!isFocused,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    htmlProps,
    getHelpTextProps,
    getErrorMessageProps,
    getRootProps,
    getLabelProps,
    getRequiredIndicatorProps
  };
}
var FormControl = forwardRef(
  function FormControl2(props, ref) {
    const styles = useMultiStyleConfig("Form", props);
    const ownProps = omitThemingProps(props);
    const {
      getRootProps,
      htmlProps: _,
      ...context
    } = useFormControlProvider(ownProps);
    const className = cx("chakra-form-control", props.className);
    return (0, import_jsx_runtime6.jsx)(FormControlProvider, { value: context, children: (0, import_jsx_runtime6.jsx)(FormControlStylesProvider, { value: styles, children: (0, import_jsx_runtime6.jsx)(
      chakra.div,
      {
        ...getRootProps({}, ref),
        className,
        __css: styles["container"]
      }
    ) }) });
  }
);
FormControl.displayName = "FormControl";
var FormHelperText = forwardRef(
  function FormHelperText2(props, ref) {
    const field = useFormControlContext();
    const styles = useFormControlStyles();
    const className = cx("chakra-form__helper-text", props.className);
    return (0, import_jsx_runtime6.jsx)(
      chakra.div,
      {
        ...field == null ? void 0 : field.getHelpTextProps(props, ref),
        __css: styles.helperText,
        className
      }
    );
  }
);
FormHelperText.displayName = "FormHelperText";

// node_modules/@chakra-ui/form-control/dist/chunk-3GP7MWMA.mjs
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var [FormErrorStylesProvider, useFormErrorStyles] = createContext({
  name: `FormErrorStylesContext`,
  errorMessage: `useFormErrorStyles returned is 'undefined'. Seems you forgot to wrap the components in "<FormError />" `
});
var FormErrorMessage = forwardRef(
  (props, ref) => {
    const styles = useMultiStyleConfig("FormError", props);
    const ownProps = omitThemingProps(props);
    const field = useFormControlContext();
    if (!(field == null ? void 0 : field.isInvalid))
      return null;
    return (0, import_jsx_runtime7.jsx)(FormErrorStylesProvider, { value: styles, children: (0, import_jsx_runtime7.jsx)(
      chakra.div,
      {
        ...field == null ? void 0 : field.getErrorMessageProps(ownProps, ref),
        className: cx("chakra-form__error-message", props.className),
        __css: {
          display: "flex",
          alignItems: "center",
          ...styles.text
        }
      }
    ) });
  }
);
FormErrorMessage.displayName = "FormErrorMessage";
var FormErrorIcon = forwardRef((props, ref) => {
  const styles = useFormErrorStyles();
  const field = useFormControlContext();
  if (!(field == null ? void 0 : field.isInvalid))
    return null;
  const _className = cx("chakra-form__error-icon", props.className);
  return (0, import_jsx_runtime7.jsx)(
    Icon,
    {
      ref,
      "aria-hidden": true,
      ...props,
      __css: styles.icon,
      className: _className,
      children: (0, import_jsx_runtime7.jsx)(
        "path",
        {
          fill: "currentColor",
          d: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
        }
      )
    }
  );
});
FormErrorIcon.displayName = "FormErrorIcon";

// node_modules/@chakra-ui/form-control/dist/chunk-RN6VKE3K.mjs
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var FormLabel = forwardRef(function FormLabel2(passedProps, ref) {
  var _a;
  const styles = useStyleConfig("FormLabel", passedProps);
  const props = omitThemingProps(passedProps);
  const {
    className,
    children,
    requiredIndicator = (0, import_jsx_runtime8.jsx)(RequiredIndicator, {}),
    optionalIndicator = null,
    ...rest
  } = props;
  const field = useFormControlContext();
  const ownProps = (_a = field == null ? void 0 : field.getLabelProps(rest, ref)) != null ? _a : { ref, ...rest };
  return (0, import_jsx_runtime8.jsxs)(
    chakra.label,
    {
      ...ownProps,
      className: cx("chakra-form__label", props.className),
      __css: {
        display: "block",
        textAlign: "start",
        ...styles
      },
      children: [
        children,
        (field == null ? void 0 : field.isRequired) ? requiredIndicator : optionalIndicator
      ]
    }
  );
});
FormLabel.displayName = "FormLabel";
var RequiredIndicator = forwardRef(
  function RequiredIndicator2(props, ref) {
    const field = useFormControlContext();
    const styles = useFormControlStyles();
    if (!(field == null ? void 0 : field.isRequired))
      return null;
    const className = cx("chakra-form__required-indicator", props.className);
    return (0, import_jsx_runtime8.jsx)(
      chakra.span,
      {
        ...field == null ? void 0 : field.getRequiredIndicatorProps(props, ref),
        __css: styles.requiredIndicator,
        className
      }
    );
  }
);
RequiredIndicator.displayName = "RequiredIndicator";

// node_modules/@chakra-ui/form-control/dist/chunk-IJBC3YLI.mjs
function useFormControl(props) {
  const { isDisabled, isInvalid, isReadOnly, isRequired, ...rest } = useFormControlProps(props);
  return {
    ...rest,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(isRequired),
    "aria-readonly": ariaAttr(isReadOnly)
  };
}
function useFormControlProps(props) {
  var _a, _b, _c;
  const field = useFormControlContext();
  const {
    id,
    disabled,
    readOnly,
    required,
    isRequired,
    isInvalid,
    isReadOnly,
    isDisabled,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const labelIds = props["aria-describedby"] ? [props["aria-describedby"]] : [];
  if ((field == null ? void 0 : field.hasFeedbackText) && (field == null ? void 0 : field.isInvalid)) {
    labelIds.push(field.feedbackId);
  }
  if (field == null ? void 0 : field.hasHelpText) {
    labelIds.push(field.helpTextId);
  }
  return {
    ...rest,
    "aria-describedby": labelIds.join(" ") || void 0,
    id: id != null ? id : field == null ? void 0 : field.id,
    isDisabled: (_a = disabled != null ? disabled : isDisabled) != null ? _a : field == null ? void 0 : field.isDisabled,
    isReadOnly: (_b = readOnly != null ? readOnly : isReadOnly) != null ? _b : field == null ? void 0 : field.isReadOnly,
    isRequired: (_c = required != null ? required : isRequired) != null ? _c : field == null ? void 0 : field.isRequired,
    isInvalid: isInvalid != null ? isInvalid : field == null ? void 0 : field.isInvalid,
    onFocus: callAllHandlers(field == null ? void 0 : field.onFocus, onFocus),
    onBlur: callAllHandlers(field == null ? void 0 : field.onBlur, onBlur)
  };
}

// node_modules/@chakra-ui/visually-hidden/dist/chunk-RSUMUOHR.mjs
var visuallyHiddenStyle = {
  border: "0",
  clip: "rect(0, 0, 0, 0)",
  height: "1px",
  width: "1px",
  margin: "-1px",
  padding: "0",
  overflow: "hidden",
  whiteSpace: "nowrap",
  position: "absolute"
};

// node_modules/@chakra-ui/visually-hidden/dist/chunk-74U3PXFJ.mjs
var VisuallyHidden = chakra("span", {
  baseStyle: visuallyHiddenStyle
});
VisuallyHidden.displayName = "VisuallyHidden";
var VisuallyHiddenInput = chakra("input", {
  baseStyle: visuallyHiddenStyle
});
VisuallyHiddenInput.displayName = "VisuallyHiddenInput";

// node_modules/@chakra-ui/react-use-update-effect/dist/index.mjs
var import_react9 = __toESM(require_react(), 1);
function useUpdateEffect(callback, deps) {
  const renderCycleRef = (0, import_react9.useRef)(false);
  const effectCycleRef = (0, import_react9.useRef)(false);
  (0, import_react9.useEffect)(() => {
    const mounted = renderCycleRef.current;
    const run = mounted && effectCycleRef.current;
    if (run) {
      return callback();
    }
    effectCycleRef.current = true;
  }, deps);
  (0, import_react9.useEffect)(() => {
    renderCycleRef.current = true;
    return () => {
      renderCycleRef.current = false;
    };
  }, []);
}

// node_modules/@zag-js/focus-visible/dist/index.mjs
var hasSetup = false;
var modality = null;
var hasEventBeforeFocus = false;
var hasBlurredWindowRecently = false;
var handlers = /* @__PURE__ */ new Set();
function trigger(modality2, event) {
  handlers.forEach((handler) => handler(modality2, event));
}
var isMac = typeof window !== "undefined" && window.navigator != null ? /^Mac/.test(window.navigator.platform) : false;
function isValidKey(e) {
  return !(e.metaKey || !isMac && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function onKeyboardEvent(event) {
  hasEventBeforeFocus = true;
  if (isValidKey(event)) {
    modality = "keyboard";
    trigger("keyboard", event);
  }
}
function onPointerEvent(event) {
  modality = "pointer";
  if (event.type === "mousedown" || event.type === "pointerdown") {
    hasEventBeforeFocus = true;
    const target = event.composedPath ? event.composedPath()[0] : event.target;
    let matches = false;
    try {
      matches = target.matches(":focus-visible");
    } catch {
    }
    if (matches)
      return;
    trigger("pointer", event);
  }
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted)
    return true;
  return event.detail === 0 && !event.pointerType;
}
function onClickEvent(e) {
  if (isVirtualClick(e)) {
    hasEventBeforeFocus = true;
    modality = "virtual";
  }
}
function onWindowFocus(event) {
  if (event.target === window || event.target === document) {
    return;
  }
  if (!hasEventBeforeFocus && !hasBlurredWindowRecently) {
    modality = "virtual";
    trigger("virtual", event);
  }
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = false;
}
function onWindowBlur() {
  hasEventBeforeFocus = false;
  hasBlurredWindowRecently = true;
}
function isFocusVisible() {
  return modality !== "pointer";
}
function setupGlobalFocusEvents() {
  if (typeof window === "undefined" || hasSetup) {
    return;
  }
  const { focus } = HTMLElement.prototype;
  HTMLElement.prototype.focus = function focusElement(...args) {
    hasEventBeforeFocus = true;
    focus.apply(this, args);
  };
  document.addEventListener("keydown", onKeyboardEvent, true);
  document.addEventListener("keyup", onKeyboardEvent, true);
  document.addEventListener("click", onClickEvent, true);
  window.addEventListener("focus", onWindowFocus, true);
  window.addEventListener("blur", onWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    document.addEventListener("pointerdown", onPointerEvent, true);
    document.addEventListener("pointermove", onPointerEvent, true);
    document.addEventListener("pointerup", onPointerEvent, true);
  } else {
    document.addEventListener("mousedown", onPointerEvent, true);
    document.addEventListener("mousemove", onPointerEvent, true);
    document.addEventListener("mouseup", onPointerEvent, true);
  }
  hasSetup = true;
}
function trackFocusVisible(fn) {
  setupGlobalFocusEvents();
  fn(isFocusVisible());
  const handler = () => fn(isFocusVisible());
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

// node_modules/@chakra-ui/checkbox/dist/chunk-H6UVDIE7.mjs
var import_react10 = __toESM(require_react(), 1);
function omit2(object, keysToOmit = []) {
  const clone = Object.assign({}, object);
  for (const key of keysToOmit) {
    if (key in clone) {
      delete clone[key];
    }
  }
  return clone;
}
function useCheckbox(props = {}) {
  const formControlProps = useFormControlProps(props);
  const {
    isDisabled,
    isReadOnly,
    isRequired,
    isInvalid,
    id,
    onBlur,
    onFocus,
    "aria-describedby": ariaDescribedBy
  } = formControlProps;
  const {
    defaultChecked,
    isChecked: checkedProp,
    isFocusable,
    onChange,
    isIndeterminate,
    name,
    value,
    tabIndex = void 0,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-invalid": ariaInvalid,
    ...rest
  } = props;
  const htmlProps = omit2(rest, [
    "isDisabled",
    "isReadOnly",
    "isRequired",
    "isInvalid",
    "id",
    "onBlur",
    "onFocus",
    "aria-describedby"
  ]);
  const onChangeProp = useCallbackRef(onChange);
  const onBlurProp = useCallbackRef(onBlur);
  const onFocusProp = useCallbackRef(onFocus);
  const [isFocusVisible2, setIsFocusVisible] = (0, import_react10.useState)(false);
  const [isFocused, setFocused] = (0, import_react10.useState)(false);
  const [isHovered, setHovered] = (0, import_react10.useState)(false);
  const [isActive, setActive] = (0, import_react10.useState)(false);
  (0, import_react10.useEffect)(() => {
    return trackFocusVisible(setIsFocusVisible);
  }, []);
  const inputRef = (0, import_react10.useRef)(null);
  const [rootIsLabelElement, setRootIsLabelElement] = (0, import_react10.useState)(true);
  const [checkedState, setCheckedState] = (0, import_react10.useState)(!!defaultChecked);
  const isControlled = checkedProp !== void 0;
  const isChecked = isControlled ? checkedProp : checkedState;
  const handleChange = (0, import_react10.useCallback)(
    (event) => {
      if (isReadOnly || isDisabled) {
        event.preventDefault();
        return;
      }
      if (!isControlled) {
        if (isChecked) {
          setCheckedState(event.target.checked);
        } else {
          setCheckedState(isIndeterminate ? true : event.target.checked);
        }
      }
      onChangeProp == null ? void 0 : onChangeProp(event);
    },
    [
      isReadOnly,
      isDisabled,
      isChecked,
      isControlled,
      isIndeterminate,
      onChangeProp
    ]
  );
  useSafeLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = Boolean(isIndeterminate);
    }
  }, [isIndeterminate]);
  useUpdateEffect(() => {
    if (isDisabled) {
      setFocused(false);
    }
  }, [isDisabled, setFocused]);
  useSafeLayoutEffect(() => {
    const el = inputRef.current;
    if (!(el == null ? void 0 : el.form))
      return;
    el.form.onreset = () => {
      setCheckedState(!!defaultChecked);
    };
  }, []);
  const trulyDisabled = isDisabled && !isFocusable;
  const onKeyDown = (0, import_react10.useCallback)(
    (event) => {
      if (event.key === " ") {
        setActive(true);
      }
    },
    [setActive]
  );
  const onKeyUp = (0, import_react10.useCallback)(
    (event) => {
      if (event.key === " ") {
        setActive(false);
      }
    },
    [setActive]
  );
  useSafeLayoutEffect(() => {
    if (!inputRef.current)
      return;
    const notInSync = inputRef.current.checked !== isChecked;
    if (notInSync) {
      setCheckedState(inputRef.current.checked);
    }
  }, [inputRef.current]);
  const getCheckboxProps = (0, import_react10.useCallback)(
    (props2 = {}, forwardedRef = null) => {
      const onPressDown = (event) => {
        if (isFocused) {
          event.preventDefault();
        }
        setActive(true);
      };
      return {
        ...props2,
        ref: forwardedRef,
        "data-active": dataAttr(isActive),
        "data-hover": dataAttr(isHovered),
        "data-checked": dataAttr(isChecked),
        "data-focus": dataAttr(isFocused),
        "data-focus-visible": dataAttr(isFocused && isFocusVisible2),
        "data-indeterminate": dataAttr(isIndeterminate),
        "data-disabled": dataAttr(isDisabled),
        "data-invalid": dataAttr(isInvalid),
        "data-readonly": dataAttr(isReadOnly),
        "aria-hidden": true,
        onMouseDown: callAllHandlers(props2.onMouseDown, onPressDown),
        onMouseUp: callAllHandlers(props2.onMouseUp, () => setActive(false)),
        onMouseEnter: callAllHandlers(
          props2.onMouseEnter,
          () => setHovered(true)
        ),
        onMouseLeave: callAllHandlers(
          props2.onMouseLeave,
          () => setHovered(false)
        )
      };
    },
    [
      isActive,
      isChecked,
      isDisabled,
      isFocused,
      isFocusVisible2,
      isHovered,
      isIndeterminate,
      isInvalid,
      isReadOnly
    ]
  );
  const getRootProps = (0, import_react10.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      ...htmlProps,
      ...props2,
      ref: mergeRefs(forwardedRef, (node) => {
        if (!node)
          return;
        setRootIsLabelElement(node.tagName === "LABEL");
      }),
      onClick: callAllHandlers(props2.onClick, () => {
        var _a;
        if (!rootIsLabelElement) {
          (_a = inputRef.current) == null ? void 0 : _a.click();
          requestAnimationFrame(() => {
            var _a2;
            (_a2 = inputRef.current) == null ? void 0 : _a2.focus();
          });
        }
      }),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    }),
    [htmlProps, isDisabled, isChecked, isInvalid, rootIsLabelElement]
  );
  const getInputProps = (0, import_react10.useCallback)(
    (props2 = {}, forwardedRef = null) => {
      return {
        ...props2,
        ref: mergeRefs(inputRef, forwardedRef),
        type: "checkbox",
        name,
        value,
        id,
        tabIndex,
        onChange: callAllHandlers(props2.onChange, handleChange),
        onBlur: callAllHandlers(
          props2.onBlur,
          onBlurProp,
          () => setFocused(false)
        ),
        onFocus: callAllHandlers(
          props2.onFocus,
          onFocusProp,
          () => setFocused(true)
        ),
        onKeyDown: callAllHandlers(props2.onKeyDown, onKeyDown),
        onKeyUp: callAllHandlers(props2.onKeyUp, onKeyUp),
        required: isRequired,
        checked: isChecked,
        disabled: trulyDisabled,
        readOnly: isReadOnly,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-invalid": ariaInvalid ? Boolean(ariaInvalid) : isInvalid,
        "aria-describedby": ariaDescribedBy,
        "aria-disabled": isDisabled,
        style: visuallyHiddenStyle
      };
    },
    [
      name,
      value,
      id,
      handleChange,
      onBlurProp,
      onFocusProp,
      onKeyDown,
      onKeyUp,
      isRequired,
      isChecked,
      trulyDisabled,
      isReadOnly,
      ariaLabel,
      ariaLabelledBy,
      ariaInvalid,
      isInvalid,
      ariaDescribedBy,
      isDisabled,
      tabIndex
    ]
  );
  const getLabelProps = (0, import_react10.useCallback)(
    (props2 = {}, forwardedRef = null) => ({
      ...props2,
      ref: forwardedRef,
      onMouseDown: callAllHandlers(props2.onMouseDown, stopEvent),
      "data-disabled": dataAttr(isDisabled),
      "data-checked": dataAttr(isChecked),
      "data-invalid": dataAttr(isInvalid)
    }),
    [isChecked, isDisabled, isInvalid]
  );
  const state = {
    isInvalid,
    isFocused,
    isChecked,
    isActive,
    isHovered,
    isIndeterminate,
    isDisabled,
    isReadOnly,
    isRequired
  };
  return {
    state,
    getRootProps,
    getCheckboxProps,
    getInputProps,
    getLabelProps,
    htmlProps
  };
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}

// node_modules/@chakra-ui/checkbox/dist/chunk-RVJOM3YK.mjs
var import_react11 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
var controlStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "top",
  userSelect: "none",
  flexShrink: 0
};
var rootStyles = {
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  verticalAlign: "top",
  position: "relative"
};
var checkAnim = keyframes({
  from: {
    opacity: 0,
    strokeDashoffset: 16,
    transform: "scale(0.95)"
  },
  to: {
    opacity: 1,
    strokeDashoffset: 0,
    transform: "scale(1)"
  }
});
var indeterminateOpacityAnim = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
});
var indeterminateScaleAnim = keyframes({
  from: {
    transform: "scaleX(0.65)"
  },
  to: {
    transform: "scaleX(1)"
  }
});
var Checkbox = forwardRef(function Checkbox2(props, ref) {
  const group = useCheckboxGroupContext();
  const mergedProps = { ...group, ...props };
  const styles = useMultiStyleConfig("Checkbox", mergedProps);
  const ownProps = omitThemingProps(props);
  const {
    spacing = "0.5rem",
    className,
    children,
    iconColor,
    iconSize,
    icon = (0, import_jsx_runtime9.jsx)(CheckboxIcon, {}),
    isChecked: isCheckedProp,
    isDisabled = group == null ? void 0 : group.isDisabled,
    onChange: onChangeProp,
    inputProps,
    ...rest
  } = ownProps;
  let isChecked = isCheckedProp;
  if ((group == null ? void 0 : group.value) && ownProps.value) {
    isChecked = group.value.includes(ownProps.value);
  }
  let onChange = onChangeProp;
  if ((group == null ? void 0 : group.onChange) && ownProps.value) {
    onChange = callAll(group.onChange, onChangeProp);
  }
  const {
    state,
    getInputProps,
    getCheckboxProps,
    getLabelProps,
    getRootProps
  } = useCheckbox({
    ...rest,
    isDisabled,
    isChecked,
    onChange
  });
  const iconStyles = (0, import_react11.useMemo)(
    () => ({
      animation: state.isIndeterminate ? `${indeterminateOpacityAnim} 20ms linear, ${indeterminateScaleAnim} 200ms linear` : `${checkAnim} 200ms linear`,
      fontSize: iconSize,
      color: iconColor,
      ...styles.icon
    }),
    [iconColor, iconSize, state.isIndeterminate, styles.icon]
  );
  const clonedIcon = (0, import_react11.cloneElement)(icon, {
    __css: iconStyles,
    isIndeterminate: state.isIndeterminate,
    isChecked: state.isChecked
  });
  return (0, import_jsx_runtime9.jsxs)(
    chakra.label,
    {
      __css: { ...rootStyles, ...styles.container },
      className: cx("chakra-checkbox", className),
      ...getRootProps(),
      children: [
        (0, import_jsx_runtime9.jsx)(
          "input",
          {
            className: "chakra-checkbox__input",
            ...getInputProps(inputProps, ref)
          }
        ),
        (0, import_jsx_runtime9.jsx)(
          chakra.span,
          {
            __css: { ...controlStyles, ...styles.control },
            className: "chakra-checkbox__control",
            ...getCheckboxProps(),
            children: clonedIcon
          }
        ),
        children && (0, import_jsx_runtime9.jsx)(
          chakra.span,
          {
            className: "chakra-checkbox__label",
            ...getLabelProps(),
            __css: {
              marginStart: spacing,
              ...styles.label
            },
            children
          }
        )
      ]
    }
  );
});
Checkbox.displayName = "Checkbox";

// node_modules/@chakra-ui/react-children-utils/dist/index.mjs
var import_react12 = __toESM(require_react(), 1);
function getValidChildren(children) {
  return import_react12.Children.toArray(children).filter(
    (child) => (0, import_react12.isValidElement)(child)
  );
}

// node_modules/@chakra-ui/layout/dist/chunk-Z47J5YMH.mjs
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var [ListStylesProvider, useListStyles] = createContext({
  name: `ListStylesContext`,
  errorMessage: `useListStyles returned is 'undefined'. Seems you forgot to wrap the components in "<List />" `
});
var List = forwardRef(function List2(props, ref) {
  const styles = useMultiStyleConfig("List", props);
  const {
    children,
    styleType = "none",
    stylePosition,
    spacing,
    ...rest
  } = omitThemingProps(props);
  const validChildren = getValidChildren(children);
  const selector2 = "& > *:not(style) ~ *:not(style)";
  const spacingStyle = spacing ? { [selector2]: { mt: spacing } } : {};
  return (0, import_jsx_runtime10.jsx)(ListStylesProvider, { value: styles, children: (0, import_jsx_runtime10.jsx)(
    chakra.ul,
    {
      ref,
      listStyleType: styleType,
      listStylePosition: stylePosition,
      role: "list",
      __css: { ...styles.container, ...spacingStyle },
      ...rest,
      children: validChildren
    }
  ) });
});
List.displayName = "List";
var OrderedList = forwardRef((props, ref) => {
  const { as, ...rest } = props;
  return (0, import_jsx_runtime10.jsx)(List, { ref, as: "ol", styleType: "decimal", marginStart: "1em", ...rest });
});
OrderedList.displayName = "OrderedList";
var UnorderedList = forwardRef(function UnorderedList2(props, ref) {
  const { as, ...rest } = props;
  return (0, import_jsx_runtime10.jsx)(List, { ref, as: "ul", styleType: "initial", marginStart: "1em", ...rest });
});
UnorderedList.displayName = "UnorderedList";
var ListItem = forwardRef(function ListItem2(props, ref) {
  const styles = useListStyles();
  return (0, import_jsx_runtime10.jsx)(chakra.li, { ref, ...props, __css: styles.item });
});
ListItem.displayName = "ListItem";
var ListIcon = forwardRef(function ListIcon2(props, ref) {
  const styles = useListStyles();
  return (0, import_jsx_runtime10.jsx)(Icon, { ref, role: "presentation", ...props, __css: styles.icon });
});
ListIcon.displayName = "ListIcon";

// node_modules/@chakra-ui/layout/dist/chunk-5FO2ZLZM.mjs
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var Grid = forwardRef(function Grid2(props, ref) {
  const {
    templateAreas,
    gap,
    rowGap,
    columnGap,
    column,
    row,
    autoFlow,
    autoRows,
    templateRows,
    autoColumns,
    templateColumns,
    ...rest
  } = props;
  const styles = {
    display: "grid",
    gridTemplateAreas: templateAreas,
    gridGap: gap,
    gridRowGap: rowGap,
    gridColumnGap: columnGap,
    gridAutoColumns: autoColumns,
    gridColumn: column,
    gridRow: row,
    gridAutoFlow: autoFlow,
    gridAutoRows: autoRows,
    gridTemplateRows: templateRows,
    gridTemplateColumns: templateColumns
  };
  return (0, import_jsx_runtime11.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
Grid.displayName = "Grid";

// node_modules/@chakra-ui/breakpoint-utils/dist/chunk-G72KV6MB.mjs
var breakpoints = Object.freeze([
  "base",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl"
]);
function mapResponsive(prop, mapper) {
  if (Array.isArray(prop)) {
    return prop.map((item) => item === null ? null : mapper(item));
  }
  if (isObject(prop)) {
    return Object.keys(prop).reduce((result, key) => {
      result[key] = mapper(prop[key]);
      return result;
    }, {});
  }
  if (prop != null) {
    return mapper(prop);
  }
  return null;
}
function arrayToObjectNotation(values, bps = breakpoints) {
  const result = {};
  values.forEach((value, index) => {
    const key = bps[index];
    if (value == null)
      return;
    result[key] = value;
  });
  return result;
}

// node_modules/@chakra-ui/layout/dist/chunk-QJDVAY5Z.mjs
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
var SimpleGrid = forwardRef(
  function SimpleGrid2(props, ref) {
    const { columns, spacingX, spacingY, spacing, minChildWidth, ...rest } = props;
    const theme = useTheme();
    const templateColumns = minChildWidth ? widthToColumns(minChildWidth, theme) : countToColumns(columns);
    return (0, import_jsx_runtime12.jsx)(
      Grid,
      {
        ref,
        gap: spacing,
        columnGap: spacingX,
        rowGap: spacingY,
        templateColumns,
        ...rest
      }
    );
  }
);
SimpleGrid.displayName = "SimpleGrid";
function toPx(n) {
  return typeof n === "number" ? `${n}px` : n;
}
function widthToColumns(width, theme) {
  return mapResponsive(width, (value) => {
    const _value = getToken("sizes", value, toPx(value))(theme);
    return value === null ? null : `repeat(auto-fit, minmax(${_value}, 1fr))`;
  });
}
function countToColumns(count) {
  return mapResponsive(
    count,
    (value) => value === null ? null : `repeat(${value}, minmax(0, 1fr))`
  );
}

// node_modules/@chakra-ui/layout/dist/chunk-6FWJQRCB.mjs
var Spacer = chakra("div", {
  baseStyle: {
    flex: 1,
    justifySelf: "stretch",
    alignSelf: "stretch"
  }
});
Spacer.displayName = "Spacer";

// node_modules/@chakra-ui/layout/dist/chunk-P74GIWPW.mjs
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
var Text = forwardRef(function Text2(props, ref) {
  const styles = useStyleConfig("Text", props);
  const { className, align, decoration, casing, ...rest } = omitThemingProps(props);
  const aliasedProps = compact({
    textAlign: props.align,
    textDecoration: props.decoration,
    textTransform: props.casing
  });
  return (0, import_jsx_runtime13.jsx)(
    chakra.p,
    {
      ref,
      className: cx("chakra-text", props.className),
      ...aliasedProps,
      ...rest,
      __css: styles
    }
  );
});
Text.displayName = "Text";

// node_modules/@chakra-ui/layout/dist/chunk-CRIDK7KT.mjs
var import_react13 = __toESM(require_react(), 1);
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
function px2(value) {
  return typeof value === "number" ? `${value}px` : value;
}
var Wrap = forwardRef(function Wrap2(props, ref) {
  const {
    spacing = "0.5rem",
    spacingX,
    spacingY,
    children,
    justify,
    direction,
    align,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const styles = (0, import_react13.useMemo)(() => {
    const { spacingX: x = spacing, spacingY: y = spacing } = {
      spacingX,
      spacingY
    };
    return {
      "--chakra-wrap-x-spacing": (theme) => mapResponsive(x, (value) => px2(tokenToCSSVar("space", value)(theme))),
      "--chakra-wrap-y-spacing": (theme) => mapResponsive(y, (value) => px2(tokenToCSSVar("space", value)(theme))),
      "--wrap-x-spacing": "calc(var(--chakra-wrap-x-spacing) / 2)",
      "--wrap-y-spacing": "calc(var(--chakra-wrap-y-spacing) / 2)",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: justify,
      alignItems: align,
      flexDirection: direction,
      listStyleType: "none",
      padding: "0",
      margin: "calc(var(--wrap-y-spacing) * -1) calc(var(--wrap-x-spacing) * -1)",
      "& > *:not(style)": {
        margin: "var(--wrap-y-spacing) var(--wrap-x-spacing)"
      }
    };
  }, [spacing, spacingX, spacingY, justify, align, direction]);
  const childrenToRender = (0, import_react13.useMemo)(
    () => shouldWrapChildren ? import_react13.Children.map(children, (child, index) => (0, import_jsx_runtime14.jsx)(WrapItem, { children: child }, index)) : children,
    [children, shouldWrapChildren]
  );
  return (0, import_jsx_runtime14.jsx)(
    chakra.div,
    {
      ref,
      className: cx("chakra-wrap", className),
      overflow: "hidden",
      ...rest,
      children: (0, import_jsx_runtime14.jsx)(chakra.ul, { className: "chakra-wrap__list", __css: styles, children: childrenToRender })
    }
  );
});
Wrap.displayName = "Wrap";
var WrapItem = forwardRef(function WrapItem2(props, ref) {
  const { className, ...rest } = props;
  return (0, import_jsx_runtime14.jsx)(
    chakra.li,
    {
      ref,
      __css: { display: "flex", alignItems: "flex-start" },
      className: cx("chakra-wrap__listitem", className),
      ...rest
    }
  );
});
WrapItem.displayName = "WrapItem";

// node_modules/@chakra-ui/layout/dist/chunk-AMDSPU3E.mjs
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
var StackItem = (props) => (0, import_jsx_runtime15.jsx)(
  chakra.div,
  {
    className: "chakra-stack__item",
    ...props,
    __css: {
      display: "inline-block",
      flex: "0 0 auto",
      minWidth: 0,
      ...props["__css"]
    }
  }
);
StackItem.displayName = "StackItem";

// node_modules/@chakra-ui/layout/dist/chunk-V4DIVZKN.mjs
var selector = "& > *:not(style) ~ *:not(style)";
function getStackStyles(options) {
  const { spacing, direction } = options;
  const directionStyles = {
    column: {
      marginTop: spacing,
      marginEnd: 0,
      marginBottom: 0,
      marginStart: 0
    },
    row: { marginTop: 0, marginEnd: 0, marginBottom: 0, marginStart: spacing },
    "column-reverse": {
      marginTop: 0,
      marginEnd: 0,
      marginBottom: spacing,
      marginStart: 0
    },
    "row-reverse": {
      marginTop: 0,
      marginEnd: spacing,
      marginBottom: 0,
      marginStart: 0
    }
  };
  return {
    flexDirection: direction,
    [selector]: mapResponsive(
      direction,
      (value) => directionStyles[value]
    )
  };
}
function getDividerStyles(options) {
  const { spacing, direction } = options;
  const dividerStyles = {
    column: {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    "column-reverse": {
      my: spacing,
      mx: 0,
      borderLeftWidth: 0,
      borderBottomWidth: "1px"
    },
    row: {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    },
    "row-reverse": {
      mx: spacing,
      my: 0,
      borderLeftWidth: "1px",
      borderBottomWidth: 0
    }
  };
  return {
    "&": mapResponsive(
      direction,
      (value) => dividerStyles[value]
    )
  };
}

// node_modules/@chakra-ui/layout/dist/chunk-O5CRURSQ.mjs
var import_react14 = __toESM(require_react(), 1);
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var Stack = forwardRef((props, ref) => {
  const {
    isInline,
    direction: directionProp,
    align,
    justify,
    spacing = "0.5rem",
    wrap,
    children,
    divider,
    className,
    shouldWrapChildren,
    ...rest
  } = props;
  const direction = isInline ? "row" : directionProp != null ? directionProp : "column";
  const styles = (0, import_react14.useMemo)(
    () => getStackStyles({ direction, spacing }),
    [direction, spacing]
  );
  const dividerStyle = (0, import_react14.useMemo)(
    () => getDividerStyles({ spacing, direction }),
    [spacing, direction]
  );
  const hasDivider = !!divider;
  const shouldUseChildren = !shouldWrapChildren && !hasDivider;
  const clones = (0, import_react14.useMemo)(() => {
    const validChildren = getValidChildren(children);
    return shouldUseChildren ? validChildren : validChildren.map((child, index) => {
      const key = typeof child.key !== "undefined" ? child.key : index;
      const isLast = index + 1 === validChildren.length;
      const wrappedChild = (0, import_jsx_runtime16.jsx)(StackItem, { children: child }, key);
      const _child = shouldWrapChildren ? wrappedChild : child;
      if (!hasDivider)
        return _child;
      const clonedDivider = (0, import_react14.cloneElement)(
        divider,
        {
          __css: dividerStyle
        }
      );
      const _divider = isLast ? null : clonedDivider;
      return (0, import_jsx_runtime16.jsxs)(import_react14.Fragment, { children: [
        _child,
        _divider
      ] }, key);
    });
  }, [
    divider,
    dividerStyle,
    hasDivider,
    shouldUseChildren,
    shouldWrapChildren,
    children
  ]);
  const _className = cx("chakra-stack", className);
  return (0, import_jsx_runtime16.jsx)(
    chakra.div,
    {
      ref,
      display: "flex",
      alignItems: align,
      justifyContent: justify,
      flexDirection: styles.flexDirection,
      flexWrap: wrap,
      className: _className,
      __css: hasDivider ? {} : { [selector]: styles[selector] },
      ...rest,
      children: clones
    }
  );
});
Stack.displayName = "Stack";

// node_modules/@chakra-ui/layout/dist/chunk-MUMUYFOI.mjs
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var VStack = forwardRef((props, ref) => (0, import_jsx_runtime17.jsx)(Stack, { align: "center", ...props, direction: "column", ref }));
VStack.displayName = "VStack";

// node_modules/@chakra-ui/layout/dist/chunk-HUQHYERK.mjs
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);
var HStack = forwardRef((props, ref) => (0, import_jsx_runtime18.jsx)(Stack, { align: "center", ...props, direction: "row", ref }));
HStack.displayName = "HStack";

// node_modules/@chakra-ui/layout/dist/chunk-MZBQPWGD.mjs
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);
var StackDivider = (props) => (0, import_jsx_runtime19.jsx)(
  chakra.div,
  {
    className: "chakra-stack__divider",
    ...props,
    __css: {
      ...props["__css"],
      borderWidth: 0,
      alignSelf: "stretch",
      borderColor: "inherit",
      width: "auto",
      height: "auto"
    }
  }
);
StackDivider.displayName = "StackDivider";

// node_modules/@chakra-ui/layout/dist/chunk-IWVFML3N.mjs
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
function spanFn(span) {
  return mapResponsive(
    span,
    (value) => value === "auto" ? "auto" : `span ${value}/span ${value}`
  );
}
var GridItem = forwardRef(function GridItem2(props, ref) {
  const {
    area,
    colSpan,
    colStart,
    colEnd,
    rowEnd,
    rowSpan,
    rowStart,
    ...rest
  } = props;
  const styles = compact({
    gridArea: area,
    gridColumn: spanFn(colSpan),
    gridRow: spanFn(rowSpan),
    gridColumnStart: colStart,
    gridColumnEnd: colEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd
  });
  return (0, import_jsx_runtime20.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
GridItem.displayName = "GridItem";

// node_modules/@chakra-ui/layout/dist/chunk-B2MGPQRJ.mjs
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var Heading = forwardRef(function Heading2(props, ref) {
  const styles = useStyleConfig("Heading", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime21.jsx)(
    chakra.h2,
    {
      ref,
      className: cx("chakra-heading", props.className),
      ...rest,
      __css: styles
    }
  );
});
Heading.displayName = "Heading";

// node_modules/@chakra-ui/layout/dist/chunk-6CSUKJP7.mjs
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var Box = chakra("div");
Box.displayName = "Box";
var Square = forwardRef(function Square2(props, ref) {
  const { size, centerContent = true, ...rest } = props;
  const styles = centerContent ? { display: "flex", alignItems: "center", justifyContent: "center" } : {};
  return (0, import_jsx_runtime22.jsx)(
    Box,
    {
      ref,
      boxSize: size,
      __css: {
        ...styles,
        flexShrink: 0,
        flexGrow: 0
      },
      ...rest
    }
  );
});
Square.displayName = "Square";
var Circle = forwardRef(function Circle2(props, ref) {
  const { size, ...rest } = props;
  return (0, import_jsx_runtime22.jsx)(Square, { size, ref, borderRadius: "9999px", ...rest });
});
Circle.displayName = "Circle";

// node_modules/@chakra-ui/layout/dist/chunk-U2ZO4DDB.mjs
var import_react15 = __toESM(require_react(), 1);
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);
var escapeRegexp = (term) => term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`);
function buildRegex(query) {
  const _query = query.filter((text) => text.length !== 0).map((text) => escapeRegexp(text.trim()));
  if (!_query.length) {
    return null;
  }
  return new RegExp(`(${_query.join("|")})`, "ig");
}
function highlightWords({ text, query }) {
  const regex = buildRegex(Array.isArray(query) ? query : [query]);
  if (!regex) {
    return [{ text, match: false }];
  }
  const result = text.split(regex).filter(Boolean);
  return result.map((str) => ({ text: str, match: regex.test(str) }));
}
function useHighlight(props) {
  const { text, query } = props;
  return (0, import_react15.useMemo)(() => highlightWords({ text, query }), [text, query]);
}
var Mark = forwardRef(function Mark2(props, ref) {
  const styles = useStyleConfig("Mark", props);
  const ownProps = omitThemingProps(props);
  return (0, import_jsx_runtime23.jsx)(
    Box,
    {
      ref,
      ...ownProps,
      as: "mark",
      __css: { bg: "transparent", whiteSpace: "nowrap", ...styles }
    }
  );
});
function Highlight(props) {
  const { children, query, styles } = props;
  if (typeof children !== "string") {
    throw new Error("The children prop of Highlight must be a string");
  }
  const chunks = useHighlight({ query, text: children });
  return (0, import_jsx_runtime23.jsx)(import_jsx_runtime23.Fragment, { children: chunks.map((chunk, index) => {
    return chunk.match ? (0, import_jsx_runtime23.jsx)(Mark, { sx: styles, children: chunk.text }, index) : (0, import_jsx_runtime23.jsx)(import_react15.Fragment, { children: chunk.text }, index);
  }) });
}

// node_modules/@chakra-ui/layout/dist/chunk-YV2Z46CE.mjs
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
var Kbd = forwardRef(function Kbd2(props, ref) {
  const styles = useStyleConfig("Kbd", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime24.jsx)(
    chakra.kbd,
    {
      ref,
      className: cx("chakra-kbd", className),
      ...rest,
      __css: {
        fontFamily: "mono",
        ...styles
      }
    }
  );
});
Kbd.displayName = "Kbd";

// node_modules/@chakra-ui/layout/dist/chunk-UNOISFZK.mjs
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);
var LinkOverlay = forwardRef(
  function LinkOverlay2(props, ref) {
    const { isExternal, target, rel, className, ...rest } = props;
    return (0, import_jsx_runtime25.jsx)(
      chakra.a,
      {
        ...rest,
        ref,
        className: cx("chakra-linkbox__overlay", className),
        rel: isExternal ? "noopener noreferrer" : rel,
        target: isExternal ? "_blank" : target,
        __css: {
          position: "static",
          "&::before": {
            content: "''",
            cursor: "inherit",
            display: "block",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%"
          }
        }
      }
    );
  }
);
var LinkBox = forwardRef(function LinkBox2(props, ref) {
  const { className, ...rest } = props;
  return (0, import_jsx_runtime25.jsx)(
    chakra.div,
    {
      ref,
      position: "relative",
      ...rest,
      className: cx("chakra-linkbox", className),
      __css: {
        "a[href]:not(.chakra-linkbox__overlay), abbr[title]": {
          position: "relative",
          zIndex: 1
        }
      }
    }
  );
});

// node_modules/@chakra-ui/layout/dist/chunk-YTV6DHKL.mjs
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
var Link = forwardRef(function Link2(props, ref) {
  const styles = useStyleConfig("Link", props);
  const { className, isExternal, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime26.jsx)(
    chakra.a,
    {
      target: isExternal ? "_blank" : void 0,
      rel: isExternal ? "noopener" : void 0,
      ref,
      className: cx("chakra-link", className),
      ...rest,
      __css: styles
    }
  );
});
Link.displayName = "Link";

// node_modules/@chakra-ui/layout/dist/chunk-DPSEBQMG.mjs
var import_react16 = __toESM(require_react(), 1);
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
var AspectRatio = forwardRef(function(props, ref) {
  const { ratio = 4 / 3, children, className, ...rest } = props;
  const child = import_react16.Children.only(children);
  const _className = cx("chakra-aspect-ratio", className);
  return (0, import_jsx_runtime27.jsx)(
    chakra.div,
    {
      ref,
      position: "relative",
      className: _className,
      _before: {
        height: 0,
        content: `""`,
        display: "block",
        paddingBottom: mapResponsive(ratio, (r) => `${1 / r * 100}%`)
      },
      __css: {
        "& > *:not(style)": {
          overflow: "hidden",
          position: "absolute",
          top: "0",
          right: "0",
          bottom: "0",
          left: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%"
        },
        "& > img, & > video": {
          objectFit: "cover"
        }
      },
      ...rest,
      children: child
    }
  );
});
AspectRatio.displayName = "AspectRatio";

// node_modules/@chakra-ui/layout/dist/chunk-FQXH56BT.mjs
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
var Badge = forwardRef(function Badge2(props, ref) {
  const styles = useStyleConfig("Badge", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime28.jsx)(
    chakra.span,
    {
      ref,
      className: cx("chakra-badge", props.className),
      ...rest,
      __css: {
        display: "inline-block",
        whiteSpace: "nowrap",
        verticalAlign: "middle",
        ...styles
      }
    }
  );
});
Badge.displayName = "Badge";

// node_modules/@chakra-ui/layout/dist/chunk-3V5HNFOM.mjs
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
var Center = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
Center.displayName = "Center";
var centerStyles = {
  horizontal: {
    insetStart: "50%",
    transform: "translateX(-50%)"
  },
  vertical: {
    top: "50%",
    transform: "translateY(-50%)"
  },
  both: {
    insetStart: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  }
};
var AbsoluteCenter = forwardRef(
  function AbsoluteCenter2(props, ref) {
    const { axis = "both", ...rest } = props;
    return (0, import_jsx_runtime29.jsx)(
      chakra.div,
      {
        ref,
        __css: centerStyles[axis],
        ...rest,
        position: "absolute"
      }
    );
  }
);

// node_modules/@chakra-ui/layout/dist/chunk-MVNZWEQB.mjs
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
var Code = forwardRef(function Code2(props, ref) {
  const styles = useStyleConfig("Code", props);
  const { className, ...rest } = omitThemingProps(props);
  return (0, import_jsx_runtime30.jsx)(
    chakra.code,
    {
      ref,
      className: cx("chakra-code", props.className),
      ...rest,
      __css: {
        display: "inline-block",
        ...styles
      }
    }
  );
});
Code.displayName = "Code";

// node_modules/@chakra-ui/layout/dist/chunk-SRMZVY4F.mjs
var import_jsx_runtime31 = __toESM(require_jsx_runtime(), 1);
var Container = forwardRef(function Container2(props, ref) {
  const { className, centerContent, ...rest } = omitThemingProps(props);
  const styles = useStyleConfig("Container", props);
  return (0, import_jsx_runtime31.jsx)(
    chakra.div,
    {
      ref,
      className: cx("chakra-container", className),
      ...rest,
      __css: {
        ...styles,
        ...centerContent && {
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }
      }
    }
  );
});
Container.displayName = "Container";

// node_modules/@chakra-ui/layout/dist/chunk-YGVX4ESO.mjs
var import_jsx_runtime32 = __toESM(require_jsx_runtime(), 1);
var Divider = forwardRef(function Divider2(props, ref) {
  const {
    borderLeftWidth,
    borderBottomWidth,
    borderTopWidth,
    borderRightWidth,
    borderWidth,
    borderStyle,
    borderColor,
    ...styles
  } = useStyleConfig("Divider", props);
  const {
    className,
    orientation = "horizontal",
    __css,
    ...rest
  } = omitThemingProps(props);
  const dividerStyles = {
    vertical: {
      borderLeftWidth: borderLeftWidth || borderRightWidth || borderWidth || "1px",
      height: "100%"
    },
    horizontal: {
      borderBottomWidth: borderBottomWidth || borderTopWidth || borderWidth || "1px",
      width: "100%"
    }
  };
  return (0, import_jsx_runtime32.jsx)(
    chakra.hr,
    {
      ref,
      "aria-orientation": orientation,
      ...rest,
      __css: {
        ...styles,
        border: "0",
        borderColor,
        borderStyle,
        ...dividerStyles[orientation],
        ...__css
      },
      className: cx("chakra-divider", className)
    }
  );
});
Divider.displayName = "Divider";

// node_modules/@chakra-ui/layout/dist/chunk-MPFPK3CX.mjs
var import_jsx_runtime33 = __toESM(require_jsx_runtime(), 1);
var Flex = forwardRef(function Flex2(props, ref) {
  const { direction, align, justify, wrap, basis, grow, shrink, ...rest } = props;
  const styles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink
  };
  return (0, import_jsx_runtime33.jsx)(chakra.div, { ref, __css: styles, ...rest });
});
Flex.displayName = "Flex";

// node_modules/@chakra-ui/table/dist/chunk-B3MS3L3D.mjs
var import_jsx_runtime34 = __toESM(require_jsx_runtime(), 1);
var [TableStylesProvider, useTableStyles] = createContext({
  name: `TableStylesContext`,
  errorMessage: `useTableStyles returned is 'undefined'. Seems you forgot to wrap the components in "<Table />" `
});
var Table = forwardRef((props, ref) => {
  const styles = useMultiStyleConfig("Table", props);
  const { className, layout, ...tableProps } = omitThemingProps(props);
  return (0, import_jsx_runtime34.jsx)(TableStylesProvider, { value: styles, children: (0, import_jsx_runtime34.jsx)(
    chakra.table,
    {
      ref,
      __css: { tableLayout: layout, ...styles.table },
      className: cx("chakra-table", className),
      ...tableProps
    }
  ) });
});
Table.displayName = "Table";

// node_modules/@chakra-ui/table/dist/chunk-DJP6PLAX.mjs
var import_jsx_runtime35 = __toESM(require_jsx_runtime(), 1);
var Thead = forwardRef((props, ref) => {
  const styles = useTableStyles();
  return (0, import_jsx_runtime35.jsx)(chakra.thead, { ...props, ref, __css: styles.thead });
});

// node_modules/@chakra-ui/table/dist/chunk-L7UVV2ML.mjs
var import_jsx_runtime36 = __toESM(require_jsx_runtime(), 1);
var Tr = forwardRef((props, ref) => {
  const styles = useTableStyles();
  return (0, import_jsx_runtime36.jsx)(chakra.tr, { ...props, ref, __css: styles.tr });
});

// node_modules/@chakra-ui/table/dist/chunk-V3BNVYZO.mjs
var import_jsx_runtime37 = __toESM(require_jsx_runtime(), 1);
var TableCaption = forwardRef(
  (props, ref) => {
    const { placement = "bottom", ...rest } = props;
    const styles = useTableStyles();
    return (0, import_jsx_runtime37.jsx)(
      chakra.caption,
      {
        ...rest,
        ref,
        __css: {
          ...styles.caption,
          captionSide: placement
        }
      }
    );
  }
);
TableCaption.displayName = "TableCaption";

// node_modules/@chakra-ui/table/dist/chunk-7FCBKWFD.mjs
var import_jsx_runtime38 = __toESM(require_jsx_runtime(), 1);
var TableContainer = forwardRef(
  (props, ref) => {
    var _a;
    const { overflow, overflowX, className, ...rest } = props;
    return (0, import_jsx_runtime38.jsx)(
      chakra.div,
      {
        ref,
        className: cx("chakra-table__container", className),
        ...rest,
        __css: {
          display: "block",
          whiteSpace: "nowrap",
          WebkitOverflowScrolling: "touch",
          overflowX: (_a = overflow != null ? overflow : overflowX) != null ? _a : "auto",
          overflowY: "hidden",
          maxWidth: "100%"
        }
      }
    );
  }
);

// node_modules/@chakra-ui/table/dist/chunk-D3HTYHQX.mjs
var import_jsx_runtime39 = __toESM(require_jsx_runtime(), 1);
var Tbody = forwardRef((props, ref) => {
  const styles = useTableStyles();
  return (0, import_jsx_runtime39.jsx)(chakra.tbody, { ...props, ref, __css: styles.tbody });
});

// node_modules/@chakra-ui/table/dist/chunk-BLRPLYZO.mjs
var import_jsx_runtime40 = __toESM(require_jsx_runtime(), 1);
var Td = forwardRef(
  ({ isNumeric, ...rest }, ref) => {
    const styles = useTableStyles();
    return (0, import_jsx_runtime40.jsx)(
      chakra.td,
      {
        ...rest,
        ref,
        __css: styles.td,
        "data-is-numeric": isNumeric
      }
    );
  }
);

// node_modules/@chakra-ui/table/dist/chunk-PEV6T2J3.mjs
var import_jsx_runtime41 = __toESM(require_jsx_runtime(), 1);
var Tfoot = forwardRef((props, ref) => {
  const styles = useTableStyles();
  return (0, import_jsx_runtime41.jsx)(chakra.tfoot, { ...props, ref, __css: styles.tfoot });
});

// node_modules/@chakra-ui/table/dist/chunk-Z3IFIKNA.mjs
var import_jsx_runtime42 = __toESM(require_jsx_runtime(), 1);
var Th = forwardRef(
  ({ isNumeric, ...rest }, ref) => {
    const styles = useTableStyles();
    return (0, import_jsx_runtime42.jsx)(
      chakra.th,
      {
        ...rest,
        ref,
        __css: styles.th,
        "data-is-numeric": isNumeric
      }
    );
  }
);

export {
  createContext,
  useCallbackRef,
  useUpdateEffect,
  mergeRefs,
  useMergeRefs,
  useControllableState,
  useImage,
  Image2 as Image,
  Img,
  getValidChildren,
  useCheckboxGroup,
  CheckboxGroup,
  CheckboxIcon,
  useFormControlStyles,
  useFormControlContext,
  FormControl,
  FormHelperText,
  useFormErrorStyles,
  FormErrorMessage,
  FormErrorIcon,
  FormLabel,
  RequiredIndicator,
  useFormControl,
  useFormControlProps,
  visuallyHiddenStyle,
  VisuallyHidden,
  VisuallyHiddenInput,
  trackFocusVisible,
  useCheckbox,
  Checkbox,
  useListStyles,
  List,
  OrderedList,
  UnorderedList,
  ListItem,
  ListIcon,
  Grid,
  breakpoints,
  arrayToObjectNotation,
  SimpleGrid,
  Spacer,
  Text,
  Wrap,
  WrapItem,
  StackItem,
  Stack,
  VStack,
  HStack,
  StackDivider,
  GridItem,
  Heading,
  Box,
  Square,
  Circle,
  useHighlight,
  Mark,
  Highlight,
  Kbd,
  LinkOverlay,
  LinkBox,
  Link,
  AspectRatio,
  Badge,
  Center,
  AbsoluteCenter,
  Code,
  Container,
  Divider,
  Flex,
  useTableStyles,
  Table,
  Thead,
  Tr,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th
};
//# sourceMappingURL=chunk-N7XUUZQK.js.map
