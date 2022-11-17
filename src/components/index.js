// Layout
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";

// Navigation
import Navbar from "./navigation/header";

// Unauthorized
import Unauthorized from "./unauthorized";

// Cards
import InfoCard from "./cards/InfoCard";
import FarmCard from "./cards/farmCard";
import PoolCard from "./cards/poolCard";

// Buttons
import DefaultButton from "./buttons/DefaultButton";

// My Assets
import Toggle from "./myassets/toggle";
import Income from "./myassets/income";
import Withdraw from "./myassets/withdraw";
import Selectors from "./myassets/selectors";
import HistoryTable from "./myassets/historyTable";
import HistoryElement from "./myassets/historyElement";
import Modal from "./myassets/modal";
import ConfirmWithdraw from "./myassets/confirmWithdraw";

// Settings
import ApiKeys from "./settings/apiKeys";
import AppConfig from "./settings/appConfig";
import IpnKeys from "./settings/ipnKeys";
import MyStore from "./settings/mystore";

// Dropdown
import Dropdown from "./dropdown/dropdown";

// Search
import Search from "./search/search";

// Datepicker
import Datepicker from "./datepicker/datepicker";

// Progress
import ProgressCircle from "./progress/progressCircle";

// Connect

// Pagination
import Pagination from "./pagination/pagination";

// Modals
import TipsModal from "./modals/tipsModal";
import ProfileModal from "./modals/profileModal";
import ProcessModal from "./modals/processModal";
import ConfirmWithdrawModal from "./modals/confirmWithdrawModal";
import ProgressModal from "./modals/progressModal";

// Pools
import AddLiquidityModal from "./modals/pools/addLiquidityModal";
import RemoveLiquidityModal from "./modals/pools/removeLiquidityModal";

// Farms
import DepositModal from "./modals/farms/despositModal";
import WithdrawModal from "./modals/farms/withdrawModal";

// Admin
import AdminHistoryTable from "./admin/historyTable";
import AdminHistoryElement from "./admin/historyElement";
import Invite from "./admin/invite";

// Management
import ManagementCreateAccount from "./management/login/createAccount";
import ManagementLogin from "./management/login/login";
import ManagementResetPassword from "./management/login/resetPassword";
import ManagementLayout from "./ManagementLayout";
import ManagementHeader from "./management/managementHeader";
import SmallCard from "./management/dashboard/smallCard";
import ManagementTable from "./management/managementTable";
import SwitchToggle from "./management/switchToggle";
import ManagementPagination from "./management/pagination";
import ConfirmationModal from "./management/confirmationModal";
import SettingsModal from "./management/settingsModal";

export {
  Navbar,
  InfoCard,
  DefaultButton,
  Toggle,
  ApiKeys,
  AppConfig,
  IpnKeys,
  MyStore,
  Dropdown,
  Income,
  Withdraw,
  Selectors,
  Search,
  Datepicker,
  HistoryTable,
  HistoryElement,
  Modal,
  ProgressCircle,
  ConfirmWithdraw,
  Pagination,
  TipsModal,
  ProfileModal,
  Unauthorized,
  ProcessModal,
  AdminHistoryTable,
  AdminHistoryElement,
  ConfirmWithdrawModal,
  Invite,
  ProgressModal,
  PoolCard,
  FarmCard,
  AddLiquidityModal,
  RemoveLiquidityModal,
  DepositModal,
  WithdrawModal,
  ManagementCreateAccount,
  ManagementLogin,
  ManagementResetPassword,
  ManagementHeader,
  ManagementLayout,
  Layout,
  RequireAuth,
  SmallCard,
  ManagementTable,
  SwitchToggle,
  ManagementPagination,
  ConfirmationModal,
  SettingsModal,
};
