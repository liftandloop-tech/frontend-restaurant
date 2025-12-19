import React from "react";
import PropTypes from "prop-types";

/**
 * FormSection renders a titled container with optional description.
 * Children are rendered inside. Used to compose the add-reservation form.
 */
const FormSection = ({ icon, title, children }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        {icon ? (
          <span className="w-5 h-5 grid place-items-center rounded-full bg-blue-600 text-white text-[11px]">
            {icon}
          </span>
        ) : null}
        <h3 className="text-[13px] font-medium">{title}</h3>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
};

FormSection.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FormSection;
