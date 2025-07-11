import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function ProjectModal({ open, onClose, project }) {
  if (!project) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{project.Title}</DialogTitle>
      <DialogContent dividers>
        <img
          src={project.Img}
          alt={project.Title}
          className="w-full h-64 object-cover rounded mb-4"
        />

        {project.Overview && (
          <Section title="Overview" content={project.Overview} />
        )}

        {project.Motivation && (
          <Section title="Motivation" content={project.Motivation} />
        )}

        {project.TechStack && (
          <Section title="Tech Stack" content={project.TechStack} />
        )}

        {project.Dataset && (
          <Section title="Dataset" content={project.Dataset} />
        )}

        {project.Features && project.Features.length > 0 && (
          <ListSection title="Key Features" items={project.Features} />
        )}

        {project.Challenges && project.Challenges.length > 0 && (
          <ListSection title="Challenges Overcome" items={project.Challenges} />
        )}

        {project.Benefits && (
          <Section title="Benefits" content={project.Benefits} />
        )}

        {project.Improvements && project.Improvements.length > 0 && (
          <ListSection title="Future Improvements" items={project.Improvements} />
        )}

        {project.Link && (
          <a
            href={project.Link}
            target="_blank"
            rel="noreferrer"
            className="text-purple-600 hover:underline block mt-4"
          >
            🔗 View Project
          </a>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Reusable text section
function Section({ title, content }) {
  return (
    <div className="mb-4">
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2" color="textSecondary">{content}</Typography>
    </div>
  );
}

// Reusable list section
function ListSection({ title, items }) {
  return (
    <div className="mb-4">
      <Typography variant="h6" gutterBottom>{title}</Typography>
      <ul className="list-disc ml-5 text-slate-700 text-sm">
        {items.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
    </div>
  );
}

ProjectModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  project: PropTypes.object,
};
