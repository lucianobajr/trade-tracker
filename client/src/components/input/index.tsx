import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  Fragment,
  useState,
} from "react";

import { Popover, Transition } from "@headlessui/react";
import { useField } from "@unform/core";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  label,
  type,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: "value" });
  }, [fieldName, registerField]);

  return (
    <div className="grid">
      <div className="flex items-baseline justify-between">
        <p className="text-black-secondary text-base font-normal leading-9">
          {label}
        </p>
      </div>

      <div className="relative">
        {Icon && <Icon size={20} />}
        <input
          className="w-full py-3 pl-4 pr-8 rounded-lg box-border border-[1px] border-gray-300 focus-within:ring-2 ring-cyan-600 text-gray-900 focus:border-transparent"
          type={type === "password" ? (!!showPassword ? "text" : "password") : type}
          defaultValue={defaultValue}
          ref={inputRef}
          {...rest}
        />
        {type === "password" && !error && (
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            onClick={handleToggle}
          >
            {!showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
        {error && (
          <Popover className="absolute top-1/2 right-3 transform -translate-y-1/2">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                    ${open ? "" : "text-opacity-90"}
                    group inline-flex items-center rounded-md py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                  <FiAlertCircle className="text-error" size={20} />
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="w-auto absolute z-10 mt-2 transform px-4 -translate-x-1/2">
                    <div className="z-10 min-w-[124px] w-full px-4 py-2 overflow-hidden rounded-lg bg-white ring-1 ring-black ring-opacity-5">
                      <p className="text-error whitespace-nowrap break-words">
                        {error}
                      </p>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Input;