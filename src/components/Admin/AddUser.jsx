import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearUserState } from "../../store/userSlice";
import { Checkbox, FileInput, Input, Section, Select } from "../../lib/AddUserSections";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    telegram_id: "",
    first_name: "",
    last_name: "",
    username: "",
    language_code: "en",
    is_premium: false,

    invited_by: "",
    friends_telegram_ids: "",

    profile_pic: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? files[0]
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "friends_telegram_ids" && value) {
        value
          .split(",")
          .map((id) => id.trim())
          .forEach((id, index) => data.append(`friends_telegram_ids[${index}]`, id));
      } else if (value !== null && value !== "") {
        if (typeof value === "boolean") {
          data.append(key, value ? 1 : 0);
        } else {
          data.append(key, value);
        }
      }
    });

    try {
      await dispatch(addUser(data)).unwrap();
      navigate("/manage-users");
    } catch (err) {}
  };

  useEffect(() => {
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 flex justify-center">
      <div className="w-full max-w-4xl">

        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Admin · Add New User</h1>
          <button
            onClick={() => navigate("/manage-users")}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm"
          >
            ← Back
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500 text-red-400 text-sm">
            {typeof error === "string" ? error : "Something went wrong"}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-xl p-4 flex flex-col gap-5"
        >
          {/* USER IDENTITY */}
          <Section title="User Identity">
            <Input name="telegram_id" label="Telegram ID" required onChange={handleChange} />
            <Input name="first_name" label="First Name" onChange={handleChange} />
            <Input name="last_name" label="Last Name" onChange={handleChange} />
            <Input name="username" label="Username" onChange={handleChange} />
            <FileInput name="profile_pic" label="Profile Photo" onChange={handleChange} />
          </Section>

          {/* LANGUAGE */}
          <Section title="Language">
            <Select name="language_code" label="Language" onChange={handleChange}>
              <option value="en">English</option>
              <option value="ru">Russian</option>
              <option value="ur">Urdu</option>
            </Select>
          </Section>

          {/* REFERRAL */}
          <Section title="Referral System">
            <Input
              name="invited_by"
              label="Invited By (Telegram ID)"
              placeholder="Leave empty if none"
              onChange={handleChange}
            />
           
          </Section>

          {/* FLAGS */}
          <div className="flex flex-wrap gap-6">
            <Checkbox
              name="is_premium"
              label="Telegram Premium"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full py-3 rounded-xl font-bold transition
            ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-400 text-black"}`}
          >
            {loading ? "CREATING USER..." : "CREATE USER"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
