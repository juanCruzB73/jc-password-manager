import { useState } from "react";
import { ICredential } from "../../../types";
import "./CustomDropdown.css";

export const CredentialDropdown = ({credentials,selectedCredentialIds,setFieldValue,}: {
  credentials: ICredential[];
  selectedCredentialIds: number[];
  setFieldValue: (field: string, value: any) => void;
}) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {setOpen(!open)};

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedId = Number(e.target.value);
    if (e.target.checked) {
      setFieldValue("selectedCredentialIds", [
        ...selectedCredentialIds,
        selectedId,
      ]);
    } else {
      setFieldValue(
        "selectedCredentialIds",
        selectedCredentialIds.filter((id) => id !== selectedId)
      );
    }
  };

  return (
  <div className="dropdown-wrapper">
    <button type="button" onClick={toggleDropdown} className="dropdown-toggle">
      Select Credentials
    </button>

    <div className="options-dropdown">
      {open&&credentials.map((cred) => (
        <label key={cred.credentialId} className="dropdown-item">
          <input
            type="checkbox"
            value={cred.credentialId!}
            checked={selectedCredentialIds.includes(cred.credentialId!)}
            onChange={handleCheckboxChange}
          />
          {cred.title}
        </label>
      ))}
    </div>

  </div>
);
};
