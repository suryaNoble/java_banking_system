const AvatarCard = ({ name, email }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-24 h-24 rounded-full bg-indigo-200 text-indigo-700 
                      flex items-center justify-center text-4xl font-bold shadow-md">
        {name?.charAt(0).toUpperCase()}
      </div>

      <h2 className="mt-3 text-xl font-semibold text-gray-800">
        {name}
      </h2>

      <p className="text-gray-500 text-sm">
        {email}
      </p>
    </div>
  );
};

export default AvatarCard;
