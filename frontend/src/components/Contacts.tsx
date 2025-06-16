import React, { useEffect, useState } from "react";
import { contacts, Contact } from "../services/api";
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
  Avatar,
  Pagination,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

const Contacts: React.FC = () => {
  const [contactsList, setContactsList] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState<Contact>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [duplicateError, setDuplicateError] = useState<string>("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await contacts.getAll();
      setContactsList(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleClickOpen = (contact?: Contact) => {
    setCurrentContact(contact || null);
    setFormData(
      contact
        ? contact
        : {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            address: "",
          }
    );
    setErrors({});
    setDuplicateError("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentContact(null);
    setErrors({});
    setDuplicateError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setDuplicateError("");
  };

  // Validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.first_name)) newErrors.first_name = "First name must contain only letters";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    else if (!/^[A-Za-z\s]+$/.test(formData.last_name)) newErrors.last_name = "Last name must contain only letters";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone must be 10-15 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check for duplicate email or phone in the current user's contacts (frontend check)
  const isDuplicate = () => {
    const emailExists = contactsList.some(
      (c) =>
        c.email.trim().toLowerCase() === formData.email.trim().toLowerCase() &&
        (!currentContact || c.id !== currentContact.id)
    );
    const phoneExists = contactsList.some(
      (c) =>
        c.phone.trim() === formData.phone.trim() &&
        (!currentContact || c.id !== currentContact.id)
    );
    if (emailExists) {
      setDuplicateError("A contact with this email already exists.");
      return true;
    }
    if (phoneExists) {
      setDuplicateError("A contact with this phone already exists.");
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (isDuplicate()) return;
    try {
      if (currentContact) {
        await contacts.update(currentContact.id!, formData);
      } else {
        await contacts.create(formData);
      }
      fetchContacts();
      handleClose();
    } catch (error: any) {
      // Backend duplicate error
      if (
        error?.response?.data?.detail &&
        typeof error.response.data.detail === "string" &&
        error.response.data.detail.includes("already exists")
      ) {
        setDuplicateError(error.response.data.detail);
      } else {
        setDuplicateError("Error saving contact.");
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await contacts.delete(id);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Helper for avatar initials
  const getInitials = (first: string, last: string) =>
    `${first?.[0] || ""}${last?.[0] || ""}`.toUpperCase();

  // Pagination logic
  const totalPages = Math.ceil(contactsList.length / rowsPerPage);
  const paginatedContacts = contactsList.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // FIX: Use correct event type for MUI Select
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setPage(1);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
          url('https://www.transparenttextures.com/patterns/cubes.png')
        `,
        backgroundRepeat: "repeat",
        py: 6,
      }}
    >
      <Container component="main" maxWidth="md">
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            p: 4,
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "stretch", sm: "center" },
              justifyContent: "space-between",
              mb: 2,
              gap: 2,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                mb: { xs: 2, sm: 0 },
                fontWeight: "bold",
                fontFamily: "Times New Roman, Times, serif",
                color: "primary.main",
                letterSpacing: 1,
              }}
            >
              Contacts
            </Typography>
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                borderRadius: 3,
                fontFamily: "Times New Roman, Times, serif",
                background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
                color: "#fff",
                boxShadow: 2,
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0 60%, #42a5f5 100%)",
                },
              }}
              onClick={() => handleClickOpen()}
            >
              Add New Contact
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="rows-per-page-label">Rows per page</InputLabel>
              <Select
                labelId="rows-per-page-label"
                value={rowsPerPage}
                label="Rows per page"
                onChange={handleRowsPerPageChange}
              >
                {[5, 10, 20, 50].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TableContainer
            component={Paper}
            elevation={0}
            sx={{
              mt: 2,
              borderRadius: 3,
              boxShadow: "0 2px 8px 0 rgba(31, 38, 135, 0.08)",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="contacts table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  ></TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    First Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    Last Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontFamily: "Times New Roman",
                      fontWeight: "bold",
                      backgroundColor: "#f5f5f5",
                      color: "#1976d2",
                      fontSize: "1.1em",
                    }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    sx={{
                      fontFamily: "Times New Roman",
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "#e3f2fd" },
                      transition: "background 0.2s",
                    }}
                  >
                    <TableCell>
                      <Avatar
                        sx={{
                          bgcolor: "#1976d2",
                          color: "#fff",
                          fontWeight: "bold",
                          boxShadow: 1,
                        }}
                      >
                        {getInitials(contact.first_name, contact.last_name) || <PersonIcon />}
                      </Avatar>
                    </TableCell>
                    <TableCell>{contact.first_name}</TableCell>
                    <TableCell>{contact.last_name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.address}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        verticalAlign: "middle",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        height: 64,
                        gap: 1,
                        background: "transparent",
                      }}
                    >
                      <Tooltip title="Edit" arrow>
                        <IconButton
                          onClick={() => handleClickOpen(contact)}
                          color="primary"
                          size="small"
                          sx={{
                            bgcolor: "#e3f2fd",
                            "&:hover": { bgcolor: "#bbdefb" },
                            mr: 1,
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton
                          onClick={() => handleDelete(contact.id!)}
                          color="error"
                          size="small"
                          sx={{
                            bgcolor: "#ffebee",
                            "&:hover": { bgcolor: "#ffcdd2" },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6, color: "text.secondary" }}>
                      No contacts found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack direction="row" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
              siblingCount={1}
              boundaryCount={1}
            />
          </Stack>
          <Dialog open={open} onClose={handleClose} PaperProps={{
            sx: {
              borderRadius: 4,
              p: 2,
              background: "linear-gradient(135deg, #e3f0ff 0%, #fafcff 100%)",
            },
          }}>
            <DialogTitle
              sx={{
                fontFamily: "Times New Roman, Times, serif",
                fontWeight: "bold",
                color: "primary.main",
                mb: 1,
              }}
            >
              {currentContact ? "Edit Contact" : "Add New Contact"}
            </DialogTitle>
            <DialogContent>
              {duplicateError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {duplicateError}
                </Alert>
              )}
              <TextField
                autoFocus
                margin="dense"
                name="first_name"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.first_name}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
              <TextField
                margin="dense"
                name="last_name"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.last_name}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error={!!errors.address}
                helperText={errors.address}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                  color: "primary.main",
                  borderColor: "primary.main",
                  mr: 1,
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontFamily: "Times New Roman, Times, serif",
                  background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
                  color: "#fff",
                  boxShadow: 2,
                }}
              >
                {currentContact ? "Save Changes" : "Add Contact"}
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contacts;