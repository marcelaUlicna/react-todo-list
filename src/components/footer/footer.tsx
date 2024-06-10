import { useMemo } from "react";

const Footer = ({ activeCount }: { activeCount: number }) => {
  const footerText = useMemo(() => 
    `${activeCount} active ${activeCount === 1 ? 'task' : 'tasks'}`, 
  [activeCount]);

  return (
    <div className="footer">{footerText}</div>
  );
};

export default Footer;
