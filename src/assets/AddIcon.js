import { Box, SvgIcon } from '@mui/material';

export const CircleWithCrossIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" width="100%" height="100%">
      <circle cx="12" cy="12" r="11.5" fill="white" stroke="currentColor" strokeWidth="1" />
      <path
        d="M12 7.5V16.5M7.5 12H16.5"
        stroke="green"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </SvgIcon>
  );
};
